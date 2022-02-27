import React from 'react'
import { styled } from '@mui/system'

import { CenteredRow } from 'common/CenteredRow'

const Root = styled(CenteredRow)({
  padding: 10,
  backgroundColor: 'rgb(54, 5, 86)',
})

export const Footer = () => {
  return (
    <Root>
      <img
        alt="Worker Town"
        width="135"
        src="https://www.worker.town/static/media/WorkerTown_Logo_TransparentBG.144530fef6fb9c231f9b.png"
      />
    </Root>
  )
}
