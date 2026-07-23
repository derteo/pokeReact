import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { usePokemonList } from '../hooks/usePokemonList'
import { useTypeList } from '../hooks/useTypeList'
import PokemonCard from '../components/PokemonCard'
import PokemonCardSkeleton from '../components/PokemonCardSkeleton'
import ErrorState from '../components/ErrorState'
import { formatPokemonName } from '../utils/pokemon'

const PAGE_SIZE = 20

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const typeFilter = searchParams.get('type') ?? ''

  const types = useTypeList()
  const { items, count, loading, error } = usePokemonList({
    page,
    pageSize: PAGE_SIZE,
    typeFilter,
  })

  const pageCount = useMemo(() => Math.max(1, Math.ceil(count / PAGE_SIZE)), [count])

  useEffect(() => {
    if (!loading && !error && page > pageCount) {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        next.set('page', String(pageCount))
        return next
      })
    }
  }, [loading, error, page, pageCount, setSearchParams])

  const handlePageChange = (_event, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(value))
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTypeChange = (event) => {
    const value = event.target.value
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set('type', value)
      else next.delete('type')
      next.set('page', '1')
      return next
    })
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
      >
        <Typography variant="h4">Pokédex</Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="type-filter-label">Tipo</InputLabel>
          <Select
            labelId="type-filter-label"
            label="Tipo"
            value={typeFilter}
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>Tutti i tipi</em>
            </MenuItem>
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {formatPokemonName(type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {error && <ErrorState message={error} />}

      {!error && (
        <Grid container spacing={2}>
          {(loading ? Array.from({ length: PAGE_SIZE }) : items).map((item, index) => (
            <Grid key={item?.id ?? index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              {loading ? <PokemonCardSkeleton /> : <PokemonCard pokemon={item} />}
            </Grid>
          ))}
        </Grid>
      )}

      {!error && !loading && items.length === 0 && (
        <Typography color="text.secondary" align="center">
          Nessun Pokémon trovato per questo filtro.
        </Typography>
      )}

      {!error && pageCount > 1 && (
        <Stack alignItems="center" sx={{ pt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
          />
        </Stack>
      )}
    </Stack>
  )
}
