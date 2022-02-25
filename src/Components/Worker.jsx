import React from 'react'
import { styled } from '@mui/system'

import { workerMetadata } from '../utils/workerMetadata'
import { NftPaper } from 'common/NftPaper'
import { ASSETS_URL, genders, multipleGenders } from '../utils/constants'
import { getWorkerImage } from 'utils/worker'
import { CenteredRow } from 'common/CenteredRow'

const Root = styled(NftPaper)({
  height: 255,
  backgroundPosition: '30% 70%',
  backgroundSize: 'cover',
  '& img': {
    marginTop: 0,
  },
})

const Info = styled('div')({
  position: 'absolute',
})

export const Worker = ({ onDelete, onChangeGender, ...worker }) => {
  const { rarity, workingHours, workingReward, workerClass, gender } = worker
  const isMultipleGenders = multipleGenders.includes(workerClass)

  const toggleGender = () => {
    onChangeGender(gender === genders.male ? genders.female : genders.male)
  }

  return (
    <Root
      onDelete={onDelete}
      backgroundImage={`url("${ASSETS_URL}background/workers/working/${workerClass
        .replace(' ', '')
        .toLowerCase()}.png")`}
    >
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
