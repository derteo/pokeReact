import { useEffect, useState } from 'react'
import { getTypeList } from '../api/pokeapi'

const EXCLUDED_TYPES = new Set(['unknown', 'shadow'])

export function useTypeList() {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getTypeList(controller.signal)
      .then((data) => {
        setTypes(data.results.map((t) => t.name).filter((name) => !EXCLUDED_TYPES.has(name)))
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return types
}
