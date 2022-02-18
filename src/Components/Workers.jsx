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

  const onChangeGender = (index) => (gender) => {
    workers[index].gender = gender
    set({ workers })
  }

  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 3,
        rowGap: 1,
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
    >
      <AddWorker />
      {workers.map((worker, index) => (
        <Worker onChangeGender={onChangeGender(index)} onDelete={deleteWorker(index)} key={index} {...worker} />
      ))}
    </Box>
  )
}
