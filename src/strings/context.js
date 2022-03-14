import React from 'react'
import { withContext } from 'utils/withContext'

export const StringsContext = React.createContext()
StringsContext.displayName = 'StringsContext'
export const withStrings = withContext(StringsContext, 'strings')
export const useStrings = () => React.useContext(StringsContext)

export const LanguageContext = React.createContext()
LanguageContext.displayName = 'languageContext'
export const withLanguage = withContext(LanguageContext, 'language')
export const useLanguage = () => React.useContext(LanguageContext)
