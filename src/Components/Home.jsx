import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system'
import { Fab as MuiFab, Fade, Typography } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'

import { Houses } from './Houses'
import { Workers } from './Workers'
import { Resume } from './Resume'
import { AppBar } from './AppBar'
import { useStrings } from '../strings/context'

const Root = styled('div')({
  width: '100%',
  margin: '0 auto',
})

const Content = styled('div')({
  maxWidth: 1200,
  '& > :not(:last-child)': {
    marginBottom: 40,
  },
})

const Group = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px 0 40px',
  '& > :not(:last-child)': {
    marginBottom: 40,
  },
})

const FirstGroup = styled(Group)({
  backgroundImage: "url('https://www.worker.town/static/media/BG.11339cadeadf0aca01a4.png')",
  backgroundColor: 'rgb(125, 166, 22)',
  backgroundRepeat: 'repeat-x',
})

const SecondGroup = styled(Group)({
  backgroundColor: 'rgb(91, 0, 170)',
  position: 'relative',
})

const Fab = styled(MuiFab)({
  position: 'fixed',
  right: 80,
  bottom: 40,
  zIndex: 10,
})

const WorkerTitle = styled(Typography)({ color: 'rgb(252, 221, 39)', textShadow: 'black 1px 4px' })

export const Home = () => {
  const strings = useStrings()
  const [showScrollButton, setShowScrollButton] = useState(document.documentElement.scrollTop >= 800)
  useEffect(() => {
    let timeout = null
    window.addEventListener(
      'scroll',
      () => {
        if (timeout) {
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          setShowScrollButton(document.documentElement.scrollTop >= 800)
        }, 200)
      },
      false,
    )
  })
  return (
    <Root>
      <FirstGroup>
        <Content>
          <AppBar />
          <Resume />
          <Typography variant="h3" color="white">
            {strings.houses}
          </Typography>
          <Houses />
        </Content>
      </FirstGroup>
      <SecondGroup>
        <Content>
          <WorkerTitle variant="h3">{strings.workers}</WorkerTitle>
          <Workers />
        </Content>
        <Fade in={showScrollButton}>
          <Fab color="secondary" size="small" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <KeyboardArrowUp />
          </Fab>
        </Fade>
      </SecondGroup>
    </Root>
  )
}
