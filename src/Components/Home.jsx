import React from 'react'
import { styled } from '@mui/system'

import { Houses } from './Houses'
import { Workers } from './Workers'
import { Resume } from './Resume'
import { AppBar } from './AppBar'
import { useStrings } from '../strings/context'
import { Romulus } from 'common/Romulus'

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
})

export const Home = () => {
  const strings = useStrings()
  return (
    <Root>
      <FirstGroup>
        <Content>
          <AppBar />
          <Resume />
          <Romulus variant="h3">{strings.houses}</Romulus>
          <Houses />
        </Content>
      </FirstGroup>
      <SecondGroup>
        <Content>
          <Romulus variant="h3" style={{ color: 'rgb(252, 221, 39)', textShadow: 'black 1px 4px' }}>
            {strings.workers}
          </Romulus>
          <Workers />
        </Content>
      </SecondGroup>
    </Root>
  )
}
