import { useEffect, useState } from 'react'
import { getPokemonPage, getPokemon, getType } from '../api/pokeapi'

export function usePokemonList({ page, pageSize, typeFilter }) {
  const [state, setState] = useState({ items: [], count: 0, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        if (typeFilter) {
          const typeData = await getType(typeFilter, controller.signal)
          const refs = typeData.pokemon.map((entry) => entry.pokemon)
          const start = (page - 1) * pageSize
          const pageRefs = refs.slice(start, start + pageSize)
          const items = await Promise.all(
            pageRefs.map((ref) => getPokemon(ref.name, controller.signal)),
          )
          if (!active) return
          setState({ items, count: refs.length, loading: false, error: null })
        } else {
          const offset = (page - 1) * pageSize
          const listData = await getPokemonPage({ limit: pageSize, offset }, controller.signal)
          const items = await Promise.all(
            listData.results.map((result) => getPokemon(result.name, controller.signal)),
          )
          if (!active) return
          setState({ items, count: listData.count, loading: false, error: null })
        }
      } catch (err) {
        if (err.name === 'AbortError' || !active) return
        setState({ items: [], count: 0, loading: false, error: err.message })
      }
    }

    load()
    return () => {
      active = false
      controller.abort()
    }
  }, [page, pageSize, typeFilter])

  return state
}
