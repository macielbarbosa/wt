import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './Components'
import { Provider } from './Provider'

export const App = () => (
  <BrowserRouter>
    <Provider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Provider>
  </BrowserRouter>
)
