import React from 'react'
import { ASSETS_URL } from 'utils/constants'

export const CoinImage = ({ large = false }) => {
  return <img style={{ marginBottom: -2 }} width={large ? 20 : 15} src={ASSETS_URL + 'items/coins.png'} />
}
