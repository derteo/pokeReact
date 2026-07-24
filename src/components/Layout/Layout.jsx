import { Outlet } from 'react-router'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Navbar from './Navbar'

export default function Layout({ mode, onToggleMode }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar mode={mode} onToggleMode={onToggleMode} />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Dati forniti da PokéAPI — progetto didattico, non affiliato a Nintendo/Game Freak/The
          Pokémon Company.
        </Typography>
      </Box>
    </Box>
  )
}
