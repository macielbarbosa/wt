import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { styled } from '@mui/system'

import { useContext } from '../../context'
import { useStrings } from '../../strings/context'
import { House } from './House'
import { SpaceBetween } from 'common/SpaceBetween'
import { CoinImage } from 'common/CoinImage'

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 40px 40px',
  minWidth: 500,
  minHeight: 300,
  userSelect: 'none',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
  },

  '&::-webkit-scrollbar-track': {
    background: '#fff',
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
    background: 'rgba(0,0,0, 0.3)',
  },
})

const Houses = styled('div')({
  marginTop: 20,
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
          <IconButton onClick={onClose} size="large" variant="outlined">
            <ArrowBack />
          </IconButton>
        </div>
        <Typography variant="h5">
          {strings.averageDailyProfit}: {strategy.coinsPerDay} <CoinImage large />
        </Typography>
        <div style={{ width: 40 }} />
      </SpaceBetween>
      <Houses>
        {strategy.houses.map((house, index) => (
          <House key={index} value={house} />
        ))}
      </Houses>
    </Root>
  )
}
