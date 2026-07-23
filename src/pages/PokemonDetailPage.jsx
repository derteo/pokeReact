import { useParams, useNavigate, Link as RouterLink } from 'react-router'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import TypeChip from '../components/TypeChip'
import StatBar from '../components/StatBar'
import ErrorState from '../components/ErrorState'
import PokemonDetailSkeleton from '../components/PokemonDetailSkeleton'
import { formatPokemonId, formatPokemonName, cleanFlavorText, typeColor, MAX_POKEMON_ID } from '../utils/pokemon'

export default function PokemonDetailPage() {
  const { idOrName } = useParams()
  const navigate = useNavigate()
  const { pokemon, species, loading, error } = usePokemonDetail(idOrName)

  if (loading) return <PokemonDetailSkeleton />

  if (error || !pokemon) {
    return (
      <Stack spacing={2} alignItems="center">
        <ErrorState message={error ?? 'Pokémon non trovato.'} />
        <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />}>
          Torna al Pokédex
        </Button>
      </Stack>
    )
  }

  const artwork =
    pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default
  const primaryType = pokemon.types[0]?.type.name
  const isInNationalDex = pokemon.id >= 1 && pokemon.id <= MAX_POKEMON_ID
  const flavorEntry =
    species?.flavor_text_entries?.find((entry) => entry.language.name === 'it') ??
    species?.flavor_text_entries?.find((entry) => entry.language.name === 'en')

  return (
    <Stack spacing={3}>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: 'flex-start' }}
      >
        Torna al Pokédex
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          border: '1px solid',
          borderColor: 'divider',
          backgroundImage: (theme) =>
            `linear-gradient(160deg, ${typeColor(primaryType)}33, ${theme.palette.background.paper} 65%)`,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <IconButton
                onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
                disabled={!isInNationalDex || pokemon.id <= 1}
                aria-label="Pokémon precedente"
              >
                <ChevronLeftIcon />
              </IconButton>
              <Box
                component="img"
                src={artwork}
                alt={pokemon.name}
                sx={{
                  width: { xs: 180, md: 240 },
                  height: { xs: 180, md: 240 },
                  objectFit: 'contain',
                }}
              />
              <IconButton
                onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
                disabled={!isInNationalDex || pokemon.id >= MAX_POKEMON_ID}
                aria-label="Pokémon successivo"
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              <Typography variant="overline" color="text.secondary">
                {formatPokemonId(pokemon.id)}
              </Typography>
              <Typography variant="h4">{formatPokemonName(pokemon.name)}</Typography>

              <Stack direction="row" spacing={1}>
                {pokemon.types.map(({ type }) => (
                  <TypeChip key={type.name} type={type.name} size="medium" />
                ))}
              </Stack>

              {flavorEntry && (
                <Typography color="text.secondary">
                  {cleanFlavorText(flavorEntry.flavor_text)}
                </Typography>
              )}

              <Stack direction="row" spacing={4}>
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    Altezza
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {(pokemon.height / 10).toFixed(1)} m
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    Peso
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </Typography>
                </Stack>
              </Stack>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Abilità
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <Chip
                      key={ability.name}
                      label={formatPokemonName(ability.name) + (is_hidden ? ' (nascosta)' : '')}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Statistiche base
        </Typography>
        <Stack spacing={1.5}>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
