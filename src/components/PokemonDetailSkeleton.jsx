import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

export default function PokemonDetailSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="text" width={140} height={40} />
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Skeleton variant="circular" width={220} height={220} sx={{ mx: 'auto' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              <Skeleton variant="text" width={80} />
              <Skeleton variant="text" width={220} height={48} />
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={70} height={28} />
                <Skeleton variant="rounded" width={70} height={28} />
              </Stack>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={1.5}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={20} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
