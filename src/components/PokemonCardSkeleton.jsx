import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

export default function PokemonCardSkeleton() {
  return (
    <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Stack alignItems="center" spacing={1}>
          <Skeleton variant="text" width={40} sx={{ alignSelf: 'flex-start' }} />
          <Skeleton variant="circular" width={120} height={120} />
          <Skeleton variant="text" width={100} />
          <Stack direction="row" spacing={0.5}>
            <Skeleton variant="rounded" width={50} height={24} />
            <Skeleton variant="rounded" width={50} height={24} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
