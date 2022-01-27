import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { Context } from './context'
import { defaultFreeHouse } from './utils/constants'
import localStorage from './utils/localStorage'
import { traceStrategy } from './utils/traceStrategy'

class ProviderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      houses: localStorage.upsertItem('houses', [defaultFreeHouse]),
      workers: localStorage.upsertItem('workers', []),
      strategy: localStorage.upsertItem('strategy', { coinsPerDay: 0 }),
    }
    this.onSet('workers')()
  }

  set = (state) => {
    const [[property, value]] = Object.entries(state)
    localStorage.setItem(property, value)
    this.setState(state, this.onSet(property))
  }

  onSet = (property) => () => {
    const mustUpdateStrategy = ['houses', 'workers'].includes(property)
    if (mustUpdateStrategy) {
      const { workers, houses } = this.state
      this.set({ strategy: traceStrategy(workers, houses) })
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          set: this.set,
          onSet: this.onSet,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Provider = compose(withRouter)(ProviderComponent)
