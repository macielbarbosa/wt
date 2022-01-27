import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './Components'
import { Provider } from './Provider'
import { StringsProvider } from './strings/StringsProvider'

export const App = () => (
  <BrowserRouter>
    <Provider>
      <StringsProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </StringsProvider>
    </Provider>
  </BrowserRouter>
)
