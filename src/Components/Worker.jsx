import React from 'react'
import { styled } from '@mui/system'
import { Female as MuiFemale, Male as MuiMale } from '@mui/icons-material'
import { Tooltip, Typography } from '@mui/material'

import { NftPaper } from 'common/NftPaper'
import { ASSETS_URL, genders, multipleGenders } from '../utils/constants'
import { getWorkerImage } from 'utils/worker'
import { CenteredRow } from 'common/CenteredRow'
import { Info as InfoComponent } from 'common/Info'
import { Coin } from 'common/Coin'
import { useStrings } from 'strings/context'

const Root = styled(NftPaper)({
  height: 255,
  backgroundPosition: '30% 70%',
  backgroundSize: 'cover',
  '& img': {
    marginTop: 0,
  },
})

const Info = styled(InfoComponent)({
  position: 'absolute',
})

const Male = styled(MuiMale)({
  marginBottom: -2,
})

const Female = styled(MuiFemale)({
  marginBottom: -4,
})

const Shadow = styled('img')({
  position: 'absolute',
  width: 100,
  bottom: 26,
  left: 67,
})

const Image = styled('img')({
  width: 175,
  zIndex: 1,
})

const Clickable = styled('div')({
  width: 120,
  height: 120,
  position: 'absolute',
  bottom: 30,
  cursor: 'pointer',
  zIndex: 2,
})

export const Worker = ({ onDelete, onChangeGender, ...worker }) => {
  const strings = useStrings()
  const { workingHours, workingReward, workerClass, gender } = worker
  const isMultipleGenders = multipleGenders.includes(workerClass)

  const toggleGender = () => {
    onChangeGender(gender === genders.male ? genders.female : genders.male)
  }

  const GenderIcon = gender === genders.male ? Male : Female

  return (
    <Root
      onDelete={onDelete}
      backgroundImage={`url("${ASSETS_URL}background/workers/working/${workerClass
        .replace(' ', '')
        .toLowerCase()}.png")`}
    >
      <Info>
        <Typography component="span" variant="subtitle2" paragraph={false}>
          {workerClass}
        </Typography>
        <GenderIcon fontSize="24" />
        <Typography variant="subtitle2">
          {workingReward} <Coin small /> in {workingHours}h
        </Typography>
      </Info>
      <CenteredRow>
        <Image width="175" src={getWorkerImage(worker)} />
        <Shadow src={`${ASSETS_URL}background/workers/shadow.png`} />
        {isMultipleGenders && (
          <Tooltip title={strings.changeGender}>
            <Clickable onClick={toggleGender} />
          </Tooltip>
        )}
      </CenteredRow>
    </Root>
  )
}
