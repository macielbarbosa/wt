import React from 'react'

import { useContext } from '../context'
import { useStrings } from '../strings/context'
import { agroupWorkers } from '../utils/agroupWorkers'

export const Strategy = () => {
  const { houses, workers, coinPerDay } = useContext()
  const strings = useStrings()

  const groupsByHouseEmblem = agroupWorkers(workers, houses)

  return (
    <div>
      <div>
        {strings.workers}: {workers.length}
      </div>
      <div>
        {strings.houses}: {houses.length}
      </div>
      <div>
        {strings.coinPerDay}: {coinsPerDay}
      </div>
    </div>
  )
}
