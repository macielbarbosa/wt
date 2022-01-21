import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    border: '1px solid lightgray',
  },
  body: {
    display: 'flex',
  },
  content: {
    width: '100%',
    padding: '30px 40px',
  },
  title: {
    flexGrow: 1,
  },
}))

export const Page = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}
