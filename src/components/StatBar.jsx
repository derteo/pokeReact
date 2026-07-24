import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { statLabel } from '../utils/pokemon'

const MAX_STAT_VALUE = 255

export default function StatBar({ name, value }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary" sx={{ width: 84, flexShrink: 0 }}>
        {statLabel(name)}
      </Typography>
      <Typography variant="body2" fontWeight={600} sx={{ width: 32, flexShrink: 0 }}>
        {value}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, (value / MAX_STAT_VALUE) * 100)}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    </Stack>
  )
}
