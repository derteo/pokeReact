import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link as RouterLink } from 'react-router'

export default function NotFoundPage() {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          maxWidth: 460,
          width: '100%',
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'divider',
          backgroundImage: (theme) =>
            `linear-gradient(160deg, ${theme.palette.primary.main}22, ${theme.palette.background.paper} 70%)`,
        }}
      >
        <CatchingPokemonIcon
          sx={{
            fontSize: 88,
            color: 'primary.main',
            opacity: 0.9,
            animation: 'notfound-spin 6s linear infinite',
            '@keyframes notfound-spin': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
          }}
        />
        <Typography variant="h2" fontWeight={800} color="primary.main" sx={{ lineHeight: 1, mt: 1 }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Pokémon non trovato
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          Come un leggendario MissingNo., questa pagina si è persa nell'erba alta e non esiste.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" size="large" startIcon={<ArrowBackIcon />}>
          Torna al Pokédex
        </Button>
      </Paper>
    </Stack>
  )
}
