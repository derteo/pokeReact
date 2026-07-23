import Chip from '@mui/material/Chip'
import { typeColor, formatPokemonName } from '../utils/pokemon'

export default function TypeChip({ type, size = 'small' }) {
  return (
    <Chip
      label={formatPokemonName(type)}
      size={size}
      sx={{
        backgroundColor: typeColor(type),
        color: '#fff',
        fontWeight: 600,
      }}
    />
  )
}
