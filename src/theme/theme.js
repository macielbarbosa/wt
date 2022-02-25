import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  name: 'default',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontFamily: 'Romulus',
          lineHeight: 0.85,
          fontSize: 20,
          padding: '4px 8px',
        },
      },
    },
  },
  breakpoints: {},
  typography: {},
  palette: {
    primary: {
      main: 'rgb(149, 0, 255)',
    },
    secondary: {
      main: 'rgb(252, 221, 39)',
    },
  },
})
