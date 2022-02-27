import React from 'react'
import { Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/system'

import { NftPaper } from 'common/NftPaper'
import { useStrings } from '../strings/context'
import { Centered } from 'common/Centered'
import { getNextArrayItem } from '../utils/getNextArrayItem'
import { tiers, houseRarities, enumEmblems } from '../utils/constants'
import { HouseImage } from 'common/HouseImage'
import { SpaceBetween } from 'common/SpaceBetween'
import { Emblem } from 'common/Emblem'
import { Info } from 'common/Info'

const Paper = styled(NftPaper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 250,
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  paddingTop: 0,
})

export const House = ({ rarity, emblem, isFree, onDelete, onChangeRarity, onChangeEmblem, capacity }) => {
  const strings = useStrings()

  const toggleRarity = () => {
    const rarityList = isFree ? Object.values(tiers) : Object.values(houseRarities)
    onChangeRarity(getNextArrayItem(rarityList, rarity))
  }

  const toggleEmblem = () => {
    onChangeEmblem(getNextArrayItem(Object.values(enumEmblems), emblem))
  }

  return (
    <Paper onDelete={onDelete} nonDeletable={isFree}>
      <Tooltip placement="top" title={strings.changeRarity}>
        <Centered onClick={toggleRarity} style={{ cursor: 'pointer' }}>
          <HouseImage rarity={rarity} />
        </Centered>
      </Tooltip>
      <SpaceBetween>
        <Info>
          <Typography variant="subtitle2">
            {isFree && strings.free + ' -'} {rarity}
          </Typography>
          <Typography variant="subtitle2">
            {strings.capacity}: {capacity}
          </Typography>
        </Info>
        {!isFree && (
          <div onClick={toggleEmblem}>
            <Emblem emblem={emblem} />
          </div>
        )}
      </SpaceBetween>
    </Paper>
  )
}
