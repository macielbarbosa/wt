import React from 'react'
import { Button, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { styled } from '@mui/system'

import { useContext } from '../../context'
import { useStrings } from '../../strings/context'
import { House } from './House'
import { SpaceBetween } from 'common/SpaceBetween'
import { Coin } from 'common/Coin'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px',
  minWidth: 500,
  minHeight: 300,
  userSelect: 'none',
  overflowY: 'auto',
})

const Houses = styled('div')({
  marginTop: 40,
  '& > *:not(:last-child)': {
    marginBottom: 20,
  },
})

export const Strategy = ({ onClose }) => {
  const { strategy } = useContext()
  const strings = useStrings()
  return (
    <Root>
      <SpaceBetween>
        <div>
          <Button onClick={onClose} size="small" variant="outlined">
            <ArrowBack />
          </Button>
        </div>
        <Typography variant="h5">
          {strings.averageDailyProfit}: {strategy.coinsPerDay} <Coin large />
        </Typography>
        <div style={{ width: 40 }} />
      </SpaceBetween>
      <Houses>
        {strategy.houses
          .filter((house) => !house.isEmpty)
          .map((house, index) => (
            <House key={index} value={house} />
          ))}
      </Houses>
    </Root>
  )
}
