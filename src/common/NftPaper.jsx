import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiButton from '@mui/material/Button'
import Fade from '@mui/material/Fade'

import { Paper } from './Paper'
import { styled } from '@mui/system'

const Button = styled(MuiButton)({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  borderTopRightRadius: 5,
})

export const NftPaper = ({ children, nonDeletable = false, onDelete, backgroundImage, ...props }) => {
  const [showButton, setShowButton] = useState(false)
  return (
    <Paper
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      style={{ position: 'relative', width: 250, userSelect: 'none', backgroundImage, overflow: 'hidden' }}
      {...props}
    >
      <Fade in={!nonDeletable && showButton}>
        <Button size="small" variant="contained" color="secondary" onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </Button>
      </Fade>
      {children}
    </Paper>
  )
}
