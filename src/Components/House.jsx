import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system'

import { NftPaper } from 'common/NftPaper'
import { useStrings } from '../strings/context'
import { Centered } from 'common/Centered'
import { getNextArrayItem } from '../utils/getNextArrayItem'
import { tiers, houseRarities, enumEmblems } from '../utils/constants'
import { HouseImage } from 'common/HouseImage'
import { SpaceBetween } from 'common/SpaceBetween'
import { EmblemImage } from 'common/EmblemImage'

const Paper = styled(NftPaper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 250,
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
      <Centered onClick={toggleRarity} style={{ cursor: 'pointer' }}>
        <HouseImage rarity={rarity} />
      </Centered>
      <SpaceBetween>
        <div>
          <div>
            {isFree && strings.free} {rarity}
          </div>
          <div>
            {strings.capacity}: {capacity}
          </div>
        </div>
        {!isFree && (
          <div onClick={toggleEmblem}>
            <EmblemImage emblem={emblem} />
          </div>
        )}
      </SpaceBetween>
    </Paper>
  )
}
