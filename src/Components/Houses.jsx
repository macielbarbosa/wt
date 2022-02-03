import React from 'react'
import { Box } from '@mui/system'

import { useContext } from '../context'
import { House } from './House'
import { AddHouse } from './AddHouse'
import { getHouseMetadata } from 'utils/getHouseMetadata'

export const Houses = () => {
  const { houses, set } = useContext()

  const onChangeRarity = (index) => (rarity) => {
    const { capacity } = getHouseMetadata(rarity)
    houses[index].rarity = rarity
    houses[index].capacity = capacity
    set({ houses })
  }

  const onChangeEmblem = (index) => (emblem) => {
    houses[index].emblem = emblem
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
        <House
          onChangeRarity={onChangeRarity(index)}
          onChangeEmblem={onChangeEmblem(index)}
          onDelete={deleteHouse(index)}
          isFree={index === 0}
          key={index}
          {...house}
        />
      ))}
      {houses.length < 4 && <AddHouse />}
    </Box>
  )
}
