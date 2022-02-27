import React from 'react'
import { styled } from '@mui/system'

import { CenteredRow } from 'common/CenteredRow'

const Root = styled(CenteredRow)({
  padding: 20,
  backgroundColor: 'rgb(54, 5, 86)',
})

export const Footer = () => {
  return (
    <Root>
      <img
        alt="Worker Town"
        width="200"
        src="https://www.worker.town/static/media/WorkerTown_Logo_TransparentBG.144530fef6fb9c231f9b.png"
      />
    </Root>
  )
}
