import React from 'react'
import { Typography } from '@mui/material'

import { Page } from 'common/Page'
import { Houses } from './Houses'
import { Workers } from './Workers'
import { Resume } from './Resume'
import { useStrings } from '../strings/context'

export const Home = () => {
  const strings = useStrings()
  return (
    <Page>
      <Resume />
      <Typography variant="h5">{strings.houses}</Typography>
      <Houses />
      <Typography variant="h5">{strings.workers}</Typography>
      <Workers />
    </Page>
  )
}
