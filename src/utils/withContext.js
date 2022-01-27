import { compose } from 'lodash/fp'
import React from 'react'

export const withContext = (context, contextName) => (Component) =>
  React.forwardRef((props, ref) => (
    <context.Consumer>{(value) => <Component ref={ref} {...{ [contextName]: value, ...props }} />}</context.Consumer>
  ))

export const withConsumers = (...consumers) => {
  return compose(...consumers)
}
