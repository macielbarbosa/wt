import { createTheme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const TEXT_COLOR = 'rgba(0, 0, 0, 0.87)'

export const dragonTheme = createTheme({
  name: 'dragon',
  breakpoints: {
    values: {
      sm: 528,
    },
  },
  typography: {
    subtitle1: {
      fontSize: 15,
      fontFamily: 'Helvetica, Arial, sans-serif',
      color: 'rgb(102, 102, 102)',
    },
    h5: {
      fontSize: 20,
      fontFamily: 'Helvetica, Arial, sans-serif',
      color: 'rgb(51,51,51)',
      fontWeight: 700,
    },
    h6: {
      fontWeight: 400,
      color: 'rgb(51,51,51)',
    },
    body1: {
      color: TEXT_COLOR,
    },
    body1: {
      color: TEXT_COLOR,
    },
  },
  palette: {
    primary: {
      main: green[800],
      dark: green[900],
      contrastText: '#fff',
    },
    storeBackground: green[50],
  },
})
