import React from 'react'
import { styled } from '@mui/system'
import { Button } from '@mui/material'

import { useContext } from '../context'
import { useStrings } from '../strings/context'
import { Centered } from 'common/Centered'
import { CenteredRow } from 'common/CenteredRow'

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
    onSet,
  } = useContext()
  const strings = useStrings()

  return (
    <CenteredRow>
      <Root>
        <div>
          {strings.workers}: {workers.length}
        </div>
        <div>
          {strings.houses}: {houses.length}
        </div>
        <div>
          {strings.dailyProfit}: {coinsPerDay} {strings[coinsPerDay > 1 ? 'coins' : 'coin']}
        </div>
        <Centered>
          <Button onClick={onSet('workers')} variant="outlined">
            {strings.strategy}
          </Button>
        </Centered>
      </Root>
    </CenteredRow>
  )
}
