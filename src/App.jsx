import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Routes, Route } from 'react-router'
import { createAppTheme } from './theme'
import Layout from './components/Layout/Layout'

const HomePage = lazy(() => import('./pages/HomePage'))
const PokemonDetailPage = lazy(() => import('./pages/PokemonDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const THEME_STORAGE_KEY = 'pokereact-theme-mode'

function getInitialMode() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [mode, setMode] = useState(getInitialMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout mode={mode} onToggleMode={toggleMode} />}>
              <Route index element={<HomePage />} />
              <Route path="pokemon/:idOrName" element={<PokemonDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
