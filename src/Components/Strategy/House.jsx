import React from 'react'
import { Paper, Tooltip } from '@mui/material'
import { styled } from '@mui/system'

import { useStrings } from '../../strings/context'
import { ASSETS_URL, enumEmblems } from 'utils/constants'
import { Bed } from './Bed'

const Root = styled(Paper)({
  display: 'inline-flex',
  flexDirection: 'row',
  padding: 20,
  maxWidth: 800,
})

const EmblemImage = styled('img')({
  width: 30,
  position: 'absolute',
  top: 10,
  right: 10,
})

export const House = ({ value: house }) => {
  const strings = useStrings()
  const { rarity, image, emblem, beds } = house
  return (
    <Root>
      <div style={{ position: 'relative' }}>
        <Tooltip title={rarity}>
          <img style={{ padding: 5 }} width="100" src={ASSETS_URL + image} />
        </Tooltip>
        {emblem !== enumEmblems.noEmblem && (
          <Tooltip title={emblem} placement="top">
            <EmblemImage src={ASSETS_URL + `houses/emblems/${emblem.toLowerCase()}.png`} />
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
