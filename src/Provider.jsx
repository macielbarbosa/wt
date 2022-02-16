import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import { Context } from './context'
import { tiers } from './utils/constants'
import localStorage from './utils/localStorage'
import { Strategy } from './models/Strategy'
import { House } from 'models/House'
import { Worker } from 'models/Worker'

class ProviderComponent extends Component {
  constructor(props) {
    super(props)
    const housesData = localStorage.upsertItem('houses', [new House(tiers.tier1)])
    const workersData = localStorage.upsertItem('workers', [])
    const houses = housesData.map(({ rarity, emblem }) => new House(rarity, emblem))
    const workers = workersData.map(({ workerClass, gender }) => new Worker(workerClass, gender))
    const strategy = new Strategy(workers, houses)
    this.state = {
      houses,
      workers,
      strategy,
    }
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
      const strategy = new Strategy(workers, houses)
      this.set({ strategy })
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
