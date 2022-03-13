import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Button as MuiButton, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { useContext } from '../context'
import { useStrings } from '../strings/context'
import { Centered } from 'common/Centered'
import { CenteredRow } from 'common/CenteredRow'
import { Strategy } from './Strategy'
import { Visibility } from '@mui/icons-material'
import { Coin } from 'common/Coin'

const Root = styled('div')({
  '& > :not(:last-child)': {
    marginBottom: 10,
  },
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 5,
  border: '1px solid lightgray',
  padding: 20,
  width: 300,
  backgroundColor: 'white',
})

const Button = styled(MuiButton)({
  marginTop: 15,
})

export const Resume = () => {
  const {
    houses,
    workers,
    strategy: { coinsPerDay },
  } = useContext()
  const strings = useStrings()
  const [openStrategy, setOpenStrategy] = useState(false)

  return (
    <CenteredRow>
      <Root>
        <Typography variant="h6">
          {houses.length > 1 ? houses.length - 1 + ' ' : ''}
          {houses.length > 2 ? strings.houses : houses.length === 2 ? strings.house : strings.noHouse}
        </Typography>
        <Typography variant="h6">
          {workers.length ? workers.length + ' ' : ''}
          {workers.length > 1 ? strings.workers : workers.length === 1 ? strings.worker : strings.noWorker}
        </Typography>
        <Typography variant="h6">
          {strings.averageDailyProfit}: {coinsPerDay} <Coin />
        </Typography>
        <Centered>
          <Button size="small" startIcon={<Visibility />} onClick={() => setOpenStrategy(true)} variant="outlined">
            {strings.strategy}
          </Button>
        </Centered>
      </Root>
      <Dialog maxWidth="md" open={openStrategy} onClose={() => setOpenStrategy(false)}>
        <Strategy onClose={() => setOpenStrategy(false)} />
      </Dialog>
    </CenteredRow>
  )
}
