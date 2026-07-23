import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function ErrorState({ message }) {
  return (
    <Stack alignItems="center" spacing={2} sx={{ py: 6 }}>
      <Alert severity="error" sx={{ maxWidth: 480, width: '100%' }}>
        <AlertTitle>Ops!</AlertTitle>
        {message}
      </Alert>
    </Stack>
  )
}
