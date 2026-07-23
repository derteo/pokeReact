const BASE_URL = 'https://pokeapi.co/api/v2'
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 500

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function request(url, signal, attempt = 0) {
  let res
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError' || attempt >= MAX_RETRIES) throw err
    await sleep(RETRY_DELAY_MS * (attempt + 1))
    return request(url, signal, attempt + 1)
  }

  if (!res.ok) {
    const retriable = res.status === 429 || res.status >= 500
    if (retriable && attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS * (attempt + 1))
      return request(url, signal, attempt + 1)
    }
    const error = new Error(
      res.status === 404 ? 'Pokémon non trovato.' : `Errore API (${res.status})`,
    )
    error.status = res.status
    throw error
  }
  return res.json()
}

export function getPokemonPage({ limit = 20, offset = 0 }, signal) {
  return request(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, signal)
}

export function getPokemon(idOrName, signal) {
  return request(`${BASE_URL}/pokemon/${idOrName}`, signal)
}

export function getPokemonSpecies(idOrName, signal) {
  return request(`${BASE_URL}/pokemon-species/${idOrName}`, signal)
}

export function getTypeList(signal) {
  return request(`${BASE_URL}/type`, signal)
}

export function getType(name, signal) {
  return request(`${BASE_URL}/type/${name}`, signal)
}

export function getIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : null
}
