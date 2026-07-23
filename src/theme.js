import { createTheme } from '@mui/material/styles'

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#d32f2f',
      },
      secondary: {
        main: '#2a75bb',
      },
      background:
        mode === 'dark'
          ? { default: '#0f1115', paper: '#171a21' }
          : { default: '#f5f6f8', paper: '#ffffff' },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: [
        '"Inter"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
  })
