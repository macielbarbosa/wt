import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export const Component = () => {
  const classes = useStyles()
  return <div className={classes.root}>Component</div>
}
