export const MAX_POKEMON_ID = 1025

export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

export function typeColor(type) {
  return TYPE_COLORS[type] ?? '#777777'
}

export function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(3, '0')}`
}

export function formatPokemonName(name) {
  return name.split('-').map(capitalize).join(' ')
}

// Converts free-typed search text (e.g. "mr mime") into the hyphenated
// slug PokeAPI expects (e.g. "mr-mime").
export function toApiSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function statLabel(statName) {
  const labels = {
    hp: 'HP',
    attack: 'Attacco',
    defense: 'Difesa',
    'special-attack': 'Att. Sp.',
    'special-defense': 'Dif. Sp.',
    speed: 'Velocità',
  }
  return labels[statName] ?? capitalize(statName)
}

export function cleanFlavorText(text) {
  return text ? text.replace(/[\n\f\r]/g, ' ') : ''
}
