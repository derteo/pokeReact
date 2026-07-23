import { useEffect, useState } from 'react'
import { getPokemonPage, getIdFromUrl } from '../api/pokeapi'

const ALL_POKEMON_LIMIT = 2000

let cachedIndexPromise = null

function loadIndex() {
  if (!cachedIndexPromise) {
    cachedIndexPromise = getPokemonPage({ limit: ALL_POKEMON_LIMIT, offset: 0 })
      .then((data) =>
        data.results.map((entry) => ({
          name: entry.name,
          id: getIdFromUrl(entry.url),
        })),
      )
      .catch((err) => {
        cachedIndexPromise = null
        throw err
      })
  }
  return cachedIndexPromise
}

export function usePokemonIndex() {
  const [index, setIndex] = useState([])

  useEffect(() => {
    let active = true
    loadIndex()
      .then((data) => {
        if (active) setIndex(data)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return index
}
