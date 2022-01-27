import React from 'react'
import { Box } from '@mui/system'

import { useContext } from '../context'
import { House } from './House'
import { AddHouse } from './AddHouse'

export const Houses = () => {
  const { houses, set } = useContext()

  const onChange = (index) => (properties) => {
    const house = houses[index]
    houses[index] = { ...house, ...properties }
    set({ houses })
  }

  const deleteHouse = (index) => () => {
    set({ houses: houses.filter((_, i) => i !== index) })
  }

  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
    >
      {houses.map((house, index) => (
        <House onChange={onChange(index)} onDelete={deleteHouse(index)} isFree={index === 0} key={index} {...house} />
      ))}
      {houses.length < 4 && <AddHouse />}
    </Box>
  )
}
