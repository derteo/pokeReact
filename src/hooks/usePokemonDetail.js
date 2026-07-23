import { useEffect, useState } from 'react'
import { getPokemon, getPokemonSpecies } from '../api/pokeapi'

export function usePokemonDetail(idOrName) {
  const [state, setState] = useState({ pokemon: null, species: null, loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setState({ pokemon: null, species: null, loading: true, error: null })
      try {
        const pokemon = await getPokemon(idOrName, controller.signal)
        const species = await getPokemonSpecies(pokemon.species.name, controller.signal).catch(
          () => null,
        )
        if (!active) return
        setState({ pokemon, species, loading: false, error: null })
      } catch (err) {
        if (err.name === 'AbortError' || !active) return
        setState({ pokemon: null, species: null, loading: false, error: err.message })
      }
    }

    load()
    return () => {
      active = false
      controller.abort()
    }
  }, [idOrName])

  return state
}
