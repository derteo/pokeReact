import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { Link as RouterLink } from 'react-router'

export default function NotFoundPage() {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
      <CatchingPokemonIcon sx={{ fontSize: 72, color: 'text.disabled' }} />
      <Typography variant="h4">404</Typography>
      <Typography color="text.secondary" align="center">
        Questo Pokémon è sfuggito nell'erba alta: la pagina non esiste.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Torna al Pokédex
      </Button>
    </Stack>
  )
}
