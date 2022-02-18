import React from 'react'
import { Paper, Tooltip } from '@mui/material'
import { styled } from '@mui/system'

import { useStrings } from '../../strings/context'
import { ASSETS_URL, enumEmblems } from 'utils/constants'
import { Bed } from './Bed'
import { HouseImage } from 'common/HouseImage'

const Root = styled(Paper)({
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
})

const EmblemImage = styled('img')({
  width: 30,
  position: 'absolute',
  top: 10,
  right: 10,
})

export const House = ({ value: house }) => {
  const strings = useStrings()
  const { rarity, emblem, beds } = house
  return (
    <Root>
      <div style={{ position: 'relative' }}>
        <HouseImage rarity={rarity} />
        {emblem !== enumEmblems.noEmblem && (
          <Tooltip title={emblem} placement="top">
            <div>
              <EmblemImage src={ASSETS_URL + `houses/emblems/${emblem.toLowerCase()}.png`} />
            </div>
          </Tooltip>
        )}
      </div>
      <div>
        {beds.map((bed, index) => (
          <Bed key={index} value={bed} />
        ))}
      </div>
    </Root>
  )
}
