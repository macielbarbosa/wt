import React from 'react'
import { Button } from '@mui/material'

import { NftPaper } from 'common/NftPaper'
import { useStrings } from '../strings/context'
import { CenteredRow } from 'common/CenteredRow'
import { getNextArrayItem } from '../utils/getNextArrayItem'
import { tiers, houseRarities, enumEmblems } from '../utils/constants'

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
    <NftPaper onDelete={onDelete} nonDeletable={isFree}>
      {!isFree && (
        <CenteredRow>
          <Button onClick={toggleEmblem}>{emblem !== enumEmblems.noEmblem ? emblem : 'No emblem'}</Button>
        </CenteredRow>
      )}
      <br />
      <div onClick={toggleRarity} style={{ cursor: 'pointer' }}>
        <div>
          {isFree && strings.free} {rarity}
        </div>
        <div>
          {strings.capacity}: {capacity}
        </div>
      </div>
    </NftPaper>
  )
}
