import React from 'react'
import { styled } from '@mui/system'
import { Tooltip } from '@mui/material'

import { getWorkerImage } from 'utils/worker'

const WorkerImage = styled('img')({
  width: 65,
  margin: '0 -15px 0 4px',
})

export const Worker = ({ value: worker }) => {
  return (
    <Tooltip title={worker.workerClass} PopperProps={{ disablePortal: true }}>
      <WorkerImage src={getWorkerImage(worker)} />
    </Tooltip>
  )
}
