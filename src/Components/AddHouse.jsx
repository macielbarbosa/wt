import React, { Fragment, useState } from 'react'
import { styled } from '@mui/system'
import { Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useStrings } from 'strings/context'
import { useContext } from 'context'
import { CenteredColumn } from 'common/CenteredColumn'
import { Paper } from 'common/Paper'
import { Selector } from '../common/Selector'
import { getHouseMetadata } from '../utils/getHouseMetadata'
import { emblems } from '../utils/constants'

const OpenButton = styled(Button)({
  width: '100%',
  height: '100%',
})

// todo: colocar fade

export const AddHouse = () => {
  const strings = useStrings()
  const { set, houses } = useContext()
  const [open, setOpen] = useState(false)

  const addHouse = (house) => {
    const houseToAdd = { ...house, ...getHouseMetadata(house.rarity), emblem: emblems.noEmblem }
    set({ houses: [...houses, houseToAdd] })
    setOpen(false)
  }

  return (
    <Paper withPadding={open}>
      {open ? (
        <Fragment>
          <Typography variant="h6" marginBottom={3}>
            {strings.addHouse}
          </Typography>
          <CenteredColumn>
            <Selector
              onChange={addHouse}
              options={housesOptions}
              placeholder="Rare"
              label={strings.addHouse}
              optionsLabel="rarity"
            />
          </CenteredColumn>
        </Fragment>
      ) : (
        <OpenButton onClick={() => setOpen(true)}>
          <AddIcon style={{ fontSize: 50 }} />
        </OpenButton>
      )}
    </Paper>
  )
}

const housesOptions = [{ rarity: 'Common' }, { rarity: 'Uncommon' }, { rarity: 'Rare' }, { rarity: 'Unique' }]
