import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { Page } from './Page'

const useStyles = makeStyles(() => ({
  root: {},
}))

export const Home = () => {
  const classes = useStyles()

  return (
    <Page>
      <div className={classes.root}>Home</div>
    </Page>
  )
}
