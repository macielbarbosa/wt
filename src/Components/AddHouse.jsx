import React, { Fragment, useState } from 'react'
import { styled } from '@mui/system'
import { Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useStrings } from 'strings/context'
import { useContext } from 'context'
import { CenteredColumn } from 'common/CenteredColumn'
import { Paper } from 'common/Paper'
import { Selector } from '../common/Selector'
import { House } from 'models/House/House'

const OpenButton = styled(Button)({
  width: '100%',
  height: '100%',
})

export const AddHouse = () => {
  const strings = useStrings()
  const { set, houses } = useContext()
  const [open, setOpen] = useState(false)

  const addHouse = ({ rarity }) => {
    set({ houses: [...houses, new House(rarity)] })
    setOpen(false)
  }

  return (
    <Paper style={{ padding: open ? 20 : 0 }}>
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
