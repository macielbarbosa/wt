import React from 'react'

import { styled } from '@mui/system'

import { useContext } from '../../context'
import { useStrings } from '../../strings/context'
import { House } from './House'

const Root = styled('div')({
  display: 'inline-flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px 40px',
  maxWidth: 800,
  userSelect: 'none',
  '& > *:not(:last-child)': {
    marginBottom: 20,
  },
})

export const Strategy = () => {
  const { strategy } = useContext()
  const strings = useStrings()
  return (
    <Root>
      {strategy.houses.map((house, index) => (
        <House key={index} value={house} />
      ))}
    </Root>
  )
}
