import React from 'react'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import { FaDiscord } from 'react-icons/fa'

import { useStrings } from '../strings/context'
import { SpaceBetween } from 'common/SpaceBetween'

const Root = styled(SpaceBetween)({
  alignItems: 'flex-start',
})

const Brand = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > span': {
    marginTop: -5,
    fontFamily: 'Romulus',
    color: 'white',
    fontSize: 30,
    textShadow: 'rgb(0 0 0 / 30%) 2px 4px 3px',
  },
})

const Actions = styled('div')({
  '& > :not(:last-child)': {
    marginRight: 8,
  },
})

export const AppBar = () => {
  const strings = useStrings()

  return (
    <Root>
      <Brand>
        <img
          alt="Worker Town"
          width="120"
          src="https://www.worker.town/static/media/WorkerTown_Logo_TransparentBG.144530fef6fb9c231f9b.png"
        />
        <span>SIMULATOR</span>
      </Brand>
      <Actions>
        <Button size="small" variant="contained" onClick={() => window.open('https://worker.town', '_blank').focus()}>
          {strings.homepage}
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => window.open('https://discord.com/users/481238176015450134', '_blank').focus()}
          startIcon={<FaDiscord fontSize="17" />}
        >
          {strings.feedback}
        </Button>
      </Actions>
    </Root>
  )
}
