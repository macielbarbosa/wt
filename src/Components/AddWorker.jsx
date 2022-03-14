import React, { Fragment, useRef, useState } from 'react'
import { styled } from '@mui/system'
import { TextField, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { useStrings } from 'strings/context'
import { useContext } from 'context'
import { CenteredColumn } from 'common/CenteredColumn'
import { Centered } from 'common/Centered'
import { Paper as MuiPaper } from 'common/Paper'
import { Selector } from 'common/Selector'
import { genders, workerClasses } from '../utils/constants'
import { Worker } from 'models/Worker'
import { useOutsideClick } from 'utils/useOutsideClick'

const OpenButton = styled(Button)({
  width: '100%',
  height: '100%',
})

const Paper = styled(MuiPaper)({
  transition: 'all 0.1s ease-in',
})

export const AddWorker = () => {
  const strings = useStrings()
  const { set, workers } = useContext()
  const [open, setOpen] = useState(false)
  const [worker, setWorker] = useState()
  const [amount, setAmount] = useState(1)
  const ref = useRef(null)
  useOutsideClick(ref, () => setOpen(false))

  const addWorker = () => {
    const { workerClass, gender } = worker
    set({ workers: [...Array.from({ length: amount }, () => new Worker(workerClass, gender)), ...workers] })
    setAmount(1)
    setOpen(false)
    setWorker(null)
  }

  return (
    <Paper ref={ref} style={{ height: 255, width: 250, padding: open ? 20 : 0 }}>
      {open ? (
        <Fragment>
          <Typography variant="h6">{strings.addWorker}</Typography>
          <Centered>
            <CenteredColumn>
              <Selector
                options={workersOptions}
                placeholder="Adventurer"
                optionsLabel="workerClass"
                onChange={setWorker}
              />
              <TextField
                type="number"
                size="small"
                value={amount}
                style={{ width: 72 }}
                onBlur={() => {
                  if (amount === '') setAmount(1)
                }}
                onChange={(event) => {
                  const { value } = event.target
                  if (value === '') setAmount('')
                  else {
                    const amount = Number(event.target.value)
                    if (amount > 0 && amount < 100) setAmount(amount)
                  }
                }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <Button size="small" variant="outlined" disabled={!Boolean(worker)} onClick={addWorker}>
                <AddIcon />
              </Button>
            </CenteredColumn>
          </Centered>
        </Fragment>
      ) : (
        <OpenButton onClick={() => setOpen(true)}>
          <AddIcon style={{ fontSize: 50 }} />
        </OpenButton>
      )}
    </Paper>
  )
}

const workersOptions = [
  { workerClass: workerClasses.bandit, gender: genders.male },
  { workerClass: workerClasses.villager, gender: genders.female },
  { workerClass: workerClasses.innKeeper, gender: genders.male },
  { workerClass: workerClasses.young, gender: genders.male },
  { workerClass: workerClasses.pirate, gender: genders.male },
  { workerClass: workerClasses.old, gender: genders.male },
  { workerClass: workerClasses.blacksmith, gender: genders.male },
  { workerClass: workerClasses.miner, gender: genders.male },
  { workerClass: workerClasses.fisherman, gender: genders.male },
  { workerClass: workerClasses.builder, gender: genders.male },
  { workerClass: workerClasses.farmer, gender: genders.male },
  { workerClass: workerClasses.adventurer, gender: genders.male },
  { workerClass: workerClasses.banditLeader, gender: genders.male },
  { workerClass: workerClasses.bard, gender: genders.female },
  { workerClass: workerClasses.dancer, gender: genders.female },
  { workerClass: workerClasses.mage, gender: genders.male },
  { workerClass: workerClasses.archer, gender: genders.female },
  { workerClass: workerClasses.gladiator, gender: genders.male },
  { workerClass: workerClasses.priestess, gender: genders.female },
  { workerClass: workerClasses.pirateLeader, gender: genders.male },
  { workerClass: workerClasses.ninja, gender: genders.male },
  { workerClass: workerClasses.cult, gender: genders.male },
  { workerClass: workerClasses.alchemist, gender: genders.male },
  { workerClass: workerClasses.royalGuard, gender: genders.male },
  { workerClass: workerClasses.knight, gender: genders.female },
  { workerClass: workerClasses.thief, gender: genders.female },
  { workerClass: workerClasses.rogue, gender: genders.male },
  //{ workerClass: workerClasses.paladin, gender: genders.male },
  { workerClass: workerClasses.santaClaus, gender: genders.male },
  { workerClass: workerClasses.necromancer, gender: genders.male },
  { workerClass: workerClasses.plagueDoctor, gender: genders.male },
  { workerClass: workerClasses.prince, gender: genders.male },
  { workerClass: workerClasses.princess, gender: genders.female },
  { workerClass: workerClasses.king, gender: genders.male },
  { workerClass: workerClasses.queen, gender: genders.female },
]
