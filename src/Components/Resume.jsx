import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { useContext } from '../context'
import { useStrings } from '../strings/context'
import { Centered } from 'common/Centered'
import { CenteredRow } from 'common/CenteredRow'
import { Strategy } from './Strategy'
import { Visibility } from '@mui/icons-material'
import { CoinImage } from 'common/CoinImage'

const Root = styled('div')({
  '& > :not(:last-child)': {
    marginBottom: 20,
  },
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 5,
  border: '1px solid lightgray',
  padding: 20,
  width: 300,
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
        <div>
          {strings.houses}: {houses.length - 1}
        </div>
        <div>
          {strings.workers}: {workers.length}
        </div>
        <div>
          {strings.dailyProfit}: {coinsPerDay} <CoinImage />
        </div>
        <Centered>
          <Button startIcon={<Visibility />} onClick={() => setOpenStrategy(true)} variant="outlined">
            {strings.strategy}
          </Button>
        </Centered>
      </Root>
      <Dialog maxWidth="xl" open={openStrategy} onClose={() => setOpenStrategy(false)}>
        <Strategy onClose={() => setOpenStrategy(false)} />
      </Dialog>
    </CenteredRow>
  )
}
