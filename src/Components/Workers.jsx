import React from 'react'
import { Box } from '@mui/system'

import { useContext } from '../context'
import { Worker } from './Worker'
import { AddWorker } from './AddWorker'

export const Workers = () => {
  const { workers, set } = useContext()

  const deleteWorker = (index) => () => {
    set({ workers: workers.filter((_, i) => i !== index) })
  }

  const onChange = (index) => (properties) => {
    const worker = workers[index]
    workers[index] = { ...worker, ...properties }
    set({ workers })
  }

  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: 'repeat(4, 1fr)',
        /* overflowY: 'auto',
        maxHeight: 500, */
      }}
    >
      <AddWorker />
      {workers.map((worker, index) => (
        <Worker onChange={onChange(index)} onDelete={deleteWorker(index)} key={index} {...worker} />
      ))}
    </Box>
  )
}
