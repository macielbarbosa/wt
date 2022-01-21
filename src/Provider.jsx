import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { Context } from './context'

class ProviderComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'value',
    }
  }

  func = () => {}

  render() {
    const { value } = this.state
    return (
      <Context.Provider
        value={{
          value,
          func: this.func,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Provider = compose(withRouter)(ProviderComponent)
