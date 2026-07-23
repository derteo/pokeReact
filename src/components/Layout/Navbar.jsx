import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import { useNavigate, Link as RouterLink } from 'react-router'
import { usePokemonIndex } from '../../hooks/usePokemonIndex'
import { formatPokemonId, formatPokemonName, toApiSlug } from '../../utils/pokemon'

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 8,
  trim: true,
  stringify: (option) => `${option.name.replace(/-/g, ' ')} ${option.id}`,
})

export default function Navbar({ mode, onToggleMode }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const pokemonIndex = usePokemonIndex()

  const goToPokemon = (nameOrId) => {
    const trimmed = toApiSlug(String(nameOrId))
    if (!trimmed) return
    navigate(`/pokemon/${trimmed}`)
    setQuery('')
  }

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ gap: 2, flexWrap: 'wrap', py: 1 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'inherit',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <CatchingPokemonIcon fontSize="large" />
          <Typography variant="h6" component="span" fontWeight={800}>
            PokéReact
          </Typography>
        </Box>

        <Autocomplete
          freeSolo
          autoHighlight
          options={pokemonIndex}
          filterOptions={filterOptions}
          inputValue={query}
          onInputChange={(_event, value) => setQuery(value)}
          onChange={(_event, value) => {
            if (!value) return
            goToPokemon(typeof value === 'string' ? value : value.name)
          }}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : formatPokemonName(option.name)
          }
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderOption={(props, option) => {
            const { key, ...rest } = props
            return (
              <Box
                component="li"
                key={key}
                {...rest}
                sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 48 }}>
                  {formatPokemonId(option.id)}
                </Typography>
                <Typography variant="body2">{formatPokemonName(option.name)}</Typography>
              </Box>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Cerca per nome o numero…"
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps?.input,
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, opacity: 0.6 }} />,
                },
              }}
            />
          )}
          sx={{
            flexGrow: 1,
            maxWidth: 420,
            ml: { xs: 0, sm: 'auto' },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              borderRadius: 1,
            },
          }}
        />

        <IconButton color="inherit" onClick={onToggleMode} aria-label="cambia tema">
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
