import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link as RouterLink } from 'react-router'
import TypeChip from './TypeChip'
import { formatPokemonId, formatPokemonName, typeColor } from '../utils/pokemon'

export default function PokemonCard({ pokemon }) {
  const primaryType = pokemon.types[0]?.type.name
  const artwork =
    pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        backgroundImage: (theme) =>
          `linear-gradient(160deg, ${typeColor(primaryType)}26, ${theme.palette.background.paper} 70%)`,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/pokemon/${pokemon.name}`}
        sx={{ height: '100%' }}
      >
        <CardContent>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'flex-start' }}>
              {formatPokemonId(pokemon.id)}
            </Typography>
            <Box
              component="img"
              src={artwork}
              alt={pokemon.name}
              loading="lazy"
              sx={{ width: 120, height: 120, objectFit: 'contain' }}
            />
            <Typography variant="subtitle1" fontWeight={700}>
              {formatPokemonName(pokemon.name)}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              {pokemon.types.map(({ type }) => (
                <TypeChip key={type.name} type={type.name} />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
