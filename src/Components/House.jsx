import React from 'react'
import { Button } from '@mui/material'

import { getHouseMetadata } from '../utils/getHouseMetadata'
import { NftPaper } from 'common/NftPaper'
import { useStrings } from '../strings/context'
import { CenteredRow } from 'common/CenteredRow'
import { getNextArrayItem } from '../utils/getNextArrayItem'
import { tiers, houseRarities, emblems } from '../utils/constants'

export const House = ({ rarity, emblem, isFree, onDelete, onChange }) => {
  const strings = useStrings()
  const { capacity } = getHouseMetadata(rarity)

  const toggleRarity = () => {
    const rarityList = isFree ? Object.values(tiers) : Object.values(houseRarities)
    onChange({ rarity: getNextArrayItem(rarityList, rarity) })
  }

  const toggleEmblem = () => {
    onChange({ emblem: getNextArrayItem(Object.values(emblems), emblem) })
  }

  return (
    <NftPaper onDelete={onDelete} nonDeletable={isFree} withPadding>
      {!isFree && (
        <CenteredRow>
          <Button onClick={toggleEmblem}>{emblem !== emblems.empty ? emblem : 'No emblem'}</Button>
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
