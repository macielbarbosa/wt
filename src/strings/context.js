import React from 'react'
import { withContext } from 'utils/withContext'

export const StringsContext = React.createContext()
StringsContext.displayName = 'StringsContext'
export const withStrings = withContext(StringsContext, 'strings')
export const useStrings = () => React.useContext(StringsContext)

export const SetStringsContext = React.createContext()
SetStringsContext.displayName = 'SetStringsContext'
export const useSetStrings = () => React.useContext(SetStringsContext)
