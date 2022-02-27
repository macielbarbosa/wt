import React, { Fragment, useRef, useState } from 'react'
import { styled } from '@mui/system'
import { Typography, Button, Tooltip } from '@mui/material'

import { useStrings } from 'strings/context'
import { useContext } from 'context'
import { Paper as MuiPaper } from 'common/Paper'
import { House } from 'models/House'
import { ASSETS_URL, rarities } from 'utils/constants'
import { houseMetadata } from 'utils/houseMetadata'
import { CenteredRow as CenteredRowComponent } from 'common/CenteredRow'
import { useOutsideClick } from 'utils/useOutsideClick'

const OpenButton = styled(Button)({
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  overflow: 'hidden',
})

const HouseButton = styled(Button)({
  width: '50%',
  overflow: 'hidden',
})

const Paper = styled(MuiPaper)({
  transition: 'all 0.1s ease-in',
  width: 250,
  height: 250,
})

const CenteredRow = styled(CenteredRowComponent)({
  width: '100%',
})

const HouseOption = ({ rarity, onClick, style, tooltipTop }) => (
  <Tooltip title={rarity} placement={tooltipTop ? 'top' : 'bottom'}>
    <HouseButton onClick={() => onClick(rarity)}>
      <img alt="house" style={style} src={ASSETS_URL + houseMetadata[rarity].image} />
    </HouseButton>
  </Tooltip>
)

export const AddHouse = () => {
  const strings = useStrings()
  const { set, houses } = useContext()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  const addHouse = (rarity) => {
    set({ houses: [...houses, new House(rarity)] })
    setOpen(false)
  }

  return (
    <Paper ref={ref} style={{ padding: open ? 20 : 0, backgroundColor: open ? 'white' : 'rgba(255, 255, 255, 0.08)' }}>
      {open ? (
        <Fragment>
          <Typography variant="h6" marginBottom={1}>
            {strings.addHouse}
          </Typography>
          <div>
            <CenteredRow>
              <HouseOption
                rarity={rarities.common}
                style={{ width: 130, margin: '-35px 0px 0px' }}
                onClick={addHouse}
                tooltipTop
              />
              <HouseOption
                rarity={rarities.uncommon}
                style={{ width: 90, margin: '-2px 0px 0px' }}
                onClick={addHouse}
                tooltipTop
              />
            </CenteredRow>
            <CenteredRow>
              <HouseOption rarity={rarities.rare} style={{ width: 80 }} onClick={addHouse} />
              <HouseOption rarity={rarities.unique} style={{ width: 80 }} onClick={addHouse} />
            </CenteredRow>
          </div>
        </Fragment>
      ) : (
        <Tooltip title={strings.addHouse}>
          <OpenButton onClick={() => setOpen(true)}>
            <img style={{ marginTop: -160 }} alt="house empty" src={ASSETS_URL + 'houses/slot.png'} />
          </OpenButton>
        </Tooltip>
      )}
    </Paper>
  )
}
