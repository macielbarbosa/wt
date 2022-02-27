import React from 'react'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'
import { RemoveModeratorTwoTone } from '@mui/icons-material'

import { ASSETS_URL, enumEmblems } from 'utils/constants'
import { useStrings } from 'strings/context'

const Root = styled('div')({ cursor: 'pointer' })

export const Emblem = ({ emblem }) => {
  const strings = useStrings()
  const Image =
    emblem === enumEmblems.noEmblem ? (
      <RemoveModeratorTwoTone fontSize="large" style={{ color: 'rgb(35,35,35)' }} />
    ) : (
      <img width="35" src={ASSETS_URL + `houses/emblems/${emblem.toLowerCase()}.png`} />
    )
  return (
    <Root>
      <Tooltip title={strings.changeEmblem}>{Image}</Tooltip>
    </Root>
  )
}
