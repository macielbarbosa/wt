import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'

const Root = styled('div')({
  maxWidth: 1200,
  margin: '0 auto',
})

const Title = styled(Typography)({
  flexGrow: 1,
})

const Content = styled('div')({
  width: '100%',
  padding: '30px 40px 60px',
  '& > :not(:last-child)': {
    marginBottom: 40,
  },
})

export const Page = ({ children }) => {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <Title variant="h6">Worker Town Simulator</Title>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex' }}>
        <Content>{children}</Content>
      </div>
    </Root>
  )
}
