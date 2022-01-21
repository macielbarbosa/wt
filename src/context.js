import React from 'react'

const setWithContext = (context, contextName) => (Component) =>
  React.forwardRef((props, ref) => (
    <context.Consumer>{(value) => <Component ref={ref} {...{ [contextName]: value, ...props }} />}</context.Consumer>
  ))

export const Context = React.createContext()
Context.displayName = 'Context'
export const withContext = setWithContext(Context, 'context')
export const useContext = () => React.useContext(Context)
