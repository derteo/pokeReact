import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineRounded'

export default function ErrorState({ title = 'Ops!', message }) {
  return (
    <Stack sx={{ alignItems: 'center', width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'error.main',
          backgroundImage: (theme) =>
            `linear-gradient(160deg, ${theme.palette.error.main}1f, ${theme.palette.background.paper} 70%)`,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 56, color: 'error.main', mb: 1 }} />
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </Paper>
    </Stack>
  )
}
