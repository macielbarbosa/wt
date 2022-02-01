import React from 'react'
// import { styled } from '@mui/system'

import { getWorkerMetadata } from '../utils/getWorkerMetadata'
import { NftPaper /* as CommonNftPaper */ } from 'common/NftPaper'
import { genders, multipleGenders } from '../utils/constants'

/* const NftPaper = styled(CommonNftPaper)({ height: 244, display: 'none' }) */

export const Worker = ({ workerClass, gender, onDelete, onChange }) => {
  const { rarity, workingHours, workingReward } = getWorkerMetadata(workerClass)
  const isMultipleGenders = multipleGenders.includes(workerClass)

  const toggleGender = () => {
    onChange({ gender: gender === genders.male ? genders.female : genders.male })
  }

  return (
    <NftPaper onDelete={onDelete} sx={{ height: 244 }}>
      <div>{workerClass}</div>
      <div>{rarity}</div>
      {isMultipleGenders ? (
        <div style={{ cursor: 'pointer' }} onClick={toggleGender}>
          {gender}
        </div>
      ) : (
        <div>{gender}</div>
      )}
      <div>{workingReward}</div>
      <div>{workingHours}</div>
    </NftPaper>
  )
}
