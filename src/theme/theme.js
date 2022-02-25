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
