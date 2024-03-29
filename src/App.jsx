import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './Components'
import { Provider } from './Provider'
import { StringsProvider } from './strings/StringsProvider'
import { theme } from './theme'
import { preloadImages } from 'utils/preloadImages'

export const App = () => {
  useEffect(() => {
    preloadImages()
  })

  return (
    <BrowserRouter>
      <Provider>
        <StringsProvider>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </ThemeProvider>
        </StringsProvider>
      </Provider>
    </BrowserRouter>
  )
}
