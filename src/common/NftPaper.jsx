import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiIconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'

import { Paper } from './Paper'
import { styled } from '@mui/system'

const IconButton = styled(MuiIconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
})

export const NftPaper = ({ children, nonDeletable = false, onDelete, ...props }) => {
  const [showButton, setShowButton] = useState(false)
  return (
    <Paper
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      style={{ position: 'relative', width: 250, userSelect: 'none' }}
      {...props}
    >
      <Fade in={!nonDeletable && showButton}>
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Fade>
      {children}
    </Paper>
  )
}
