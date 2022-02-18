import React from 'react'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'

import { ASSETS_URL, enumEmblems } from 'utils/constants'

const Root = styled('div')({ cursor: 'pointer' })

export const EmblemImage = ({ emblem }) => {
  const Image =
    emblem === enumEmblems.noEmblem ? (
      <img width="35" src="/no-emblem.png" />
    ) : (
      <img width="35" src={ASSETS_URL + `houses/emblems/${emblem.toLowerCase()}.png`} />
    )
  return (
    <Root>
      <Tooltip title={emblem}>{Image}</Tooltip>
    </Root>
  )
}
