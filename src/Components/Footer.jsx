import React from 'react'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { IoDocumentText } from 'react-icons/io5'
import { SiDiscord, SiTelegram, SiTwitter } from 'react-icons/si'

import { CenteredRow } from 'common/CenteredRow'
import { SpaceBetween } from 'common/SpaceBetween'
import { useStrings } from 'strings/context'

const Root = styled(CenteredRow)({
  backgroundColor: 'rgb(54, 5, 86)',
  padding: 10,
})

const Content = styled(SpaceBetween)({
  maxWidth: 1072,
  width: '100%',
  '& > img': {
    cursor: 'pointer',
  },
})

const Links = styled('div')({
  width: '100%',
  fontSize: 26,
  color: 'white',
  '& > *': {
    cursor: 'pointer',
  },
  '& > :not(:last-child)': {
    marginRight: 20,
  },
})

const Credits = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  color: 'white',
})

const CenteredColumn = styled('div')({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Magr1nx = styled(Typography)({
  '& > img': {
    width: 40,
    margin: '-20px -5px 0px -10px',
  },
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'Bradley Hand, cursive',
  fontStyle: 'italic',
})

export const Footer = () => {
  const strings = useStrings()
  const openLink = (link) => window.open(link, '_blank').focus()
  return (
    <Root>
      <Content>
        <Links>
          <SiDiscord onClick={() => openLink('https://discord.worker.town')} />
          <SiTwitter onClick={() => openLink('https://twitter.com/worker_town')} />
          <SiTelegram onClick={() => openLink('https://t.me/workertown')} />
          <IoDocumentText onClick={() => openLink('https://whitepaper.worker.town')} />
        </Links>
        <img
          alt="Worker Town"
          width="135"
          src="https://www.worker.town/static/media/WorkerTown_Logo_TransparentBG.144530fef6fb9c231f9b.png"
          onClick={() => openLink('https://worker.town')}
        />
        <Credits>
          <CenteredColumn onClick={() => openLink('https://discord.com/users/481238176015450134')}>
            <Typography>{strings.developedBy}</Typography>
            <Magr1nx>
              <img src="https://static.worker.town/assets/v1/sprites/mage_male.png" alt="mage" /> magr1nx
            </Magr1nx>
          </CenteredColumn>
        </Credits>
      </Content>
    </Root>
  )
}
