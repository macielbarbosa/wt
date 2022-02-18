import React from 'react'
import { styled } from '@mui/system'

import { workerMetadata } from '../utils/workerMetadata'
import { NftPaper } from 'common/NftPaper'
import { genders, multipleGenders } from '../utils/constants'
import { getWorkerImage } from 'utils/worker'
import { CenteredRow } from 'common/CenteredRow'

const Root = styled(NftPaper)({
  height: 244,
  '& img': {
    marginTop: 0,
  },
})

const Info = styled('div')({
  position: 'absolute',
})

export const Worker = ({ onDelete, onChange, ...worker }) => {
  const { rarity, workingHours, workingReward, workerClass, gender } = worker
  const isMultipleGenders = multipleGenders.includes(workerClass)

  const toggleGender = () => {
    onChange({ gender: gender === genders.male ? genders.female : genders.male })
  }

  return (
    <Root onDelete={onDelete}>
      <Info>
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
      </Info>
      <CenteredRow>
        <img width="175" src={getWorkerImage(worker)} />
      </CenteredRow>
    </Root>
  )
}
