import React, { Component } from 'react'

import { StringsContext, LanguageContext } from './context'
import { enumLanguage } from './enumLanguage'
import { english } from './english'
import { portuguese } from './portuguese'
import { spanish } from './spanish'
import localStorage from 'utils/localStorage'

export class StringsProvider extends Component {
  constructor(props) {
    super(props)
    const language = localStorage.upsertItem('language', enumLanguage.english)
    this.state = this.getState(language)
  }

  getState = (language) => {
    switch (language) {
      case enumLanguage.portuguese:
        return { language: enumLanguage.portuguese, strings: portuguese }
      case enumLanguage.english:
        return { language: enumLanguage.english, strings: english }
      case enumLanguage.spanish:
        return { language: enumLanguage.spanish, strings: spanish }
      default:
        return { language: enumLanguage.english, strings: english }
    }
  }

  setLanguage = (language) => {
    const state = this.getState(language)
    localStorage.setItem('language', state.language)
    this.setState(state)
  }

  render() {
    const { children } = this.props
    const { language, strings } = this.state
    return (
      <LanguageContext.Provider value={{ language, setLanguage: this.setLanguage }}>
        <StringsContext.Provider value={strings}>{children}</StringsContext.Provider>
      </LanguageContext.Provider>
    )
  }
}
