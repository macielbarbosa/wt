import React from 'react'
import { ASSETS_URL } from 'utils/constants'

export const Coin = ({ large = false }) => {
  return <img alt="coin" style={{ marginBottom: -2 }} width={large ? 20 : 15} src={ASSETS_URL + 'items/coins.png'} />
}
