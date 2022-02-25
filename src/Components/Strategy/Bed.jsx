import React from 'react'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'

import { useStrings } from '../../strings/context'
import { ASSETS_URL, bedsImages } from 'utils/constants'
import { Worker } from './Worker'

const Root = styled('div')({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '10px 20px',
  margin: 10,
  maxWidth: 800,
  borderRadius: 5,
  backgroundColor: '#00000005',
  border: '1px solid lightgray',
})

const EmblemImage = styled('img')({
  width: 22,
  position: 'absolute',
  top: 2,
  right: 2,
})

export const Bed = ({ value: bed }) => {
  const strings = useStrings()
  const { worker1, worker2, type } = bed
  const workerWithEmblemBonus = [worker1, worker2].find((worker) => worker && worker.withEmblemBonus)
  return (
    <Root>
      <div>
        <Tooltip title={type.name}>
          <img width="40" src={ASSETS_URL + bedsImages[type.name]} />
        </Tooltip>
        <Worker value={worker1} />
        {worker2 && <Worker value={worker2} />}
      </div>
      {workerWithEmblemBonus && (
        <EmblemImage src={ASSETS_URL + `houses/emblems/${workerWithEmblemBonus.emblem.toLowerCase()}.png`} />
      )}
    </Root>
  )
}
