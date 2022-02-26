import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  name: 'default',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 5,
          borderRadius: 0,
          fontFamily: 'Romulus',
          fontSize: 20,
        },
        containedSizeSmall: {
          lineHeight: 0.85,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        containedSizeSmall: {
          lineHeight: 0.85,
        },
      },
    },
  },
  breakpoints: {},
  typography: {
    h3: {
      fontFamily: 'Romulus',
      textTransform: 'uppercase',
      textShadow: 'rgb(0 0 0 / 30%) 2px 4px 3px',
      fontWeight: 400,
      fontSize: 48,
    },
    h6: {
      fontWeight: 400,
      fontSize: 18,
    },
  },
  palette: {
    primary: {
      main: 'rgb(149, 0, 255)',
    },
    secondary: {
      main: 'rgb(252, 221, 39)',
    },
  },
})
