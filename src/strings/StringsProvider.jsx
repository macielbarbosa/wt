import React, { Component } from 'react'

import { SetStringsContext, StringsContext } from './context'
import { enumLanguage } from './enumLanguage'
import { enUs } from './enUs'
import { ptBr } from './ptBr'

export class StringsProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strings: ptBr,
    }
  }

  setStrings = language => {
    this.setState({ strings: language === enumLanguage.portuguese ? ptBr : enUs })
  }

  render() {
    const { children } = this.props
    return (
      <SetStringsContext.Provider value={this.setStrings}>
        <StringsContext.Provider value={this.state.strings}>{children}</StringsContext.Provider>
      </SetStringsContext.Provider>
    )
  }
}
