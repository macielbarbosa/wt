import React from 'react'
import { styled } from '@mui/system'

import { ASSETS_URL, rarities, tiers } from 'utils/constants'
import { houseMetadata } from 'utils/houseMetadata'

const Tier1 = styled('img')({
  width: 260,
  margin: '-41px -30px 0px',
})

const Tier2 = styled('img')({
  width: 260,
  margin: '-41px -30px 0px',
})

const Tier3 = styled('img')({
  width: 230,
  margin: '-15px -15px 0px',
})

const Common = styled('img')({
  width: 250,
  margin: '-70px -25px 0px',
})

const Uncommon = styled('img')({
  width: 210,
  margin: '-10px -5px 0px',
})

const Rare = styled('img')({
  width: 210,
  margin: '-30px -5px 0px',
})

const Unique = styled('img')({
  width: 200,
  margin: '0px 0px 0px',
})

export const HouseImage = ({ rarity }) => {
  let ImageComponent = (...props) => <img alt="img" {...props} />
  switch (rarity) {
    case tiers.tier1:
      ImageComponent = Tier1
      break
    case tiers.tier2:
      ImageComponent = Tier2
      break
    case tiers.tier3:
      ImageComponent = Tier3
      break
    case rarities.common:
      ImageComponent = Common
      break
    case rarities.uncommon:
      ImageComponent = Uncommon
      break
    case rarities.rare:
      ImageComponent = Rare
      break
    case rarities.unique:
      ImageComponent = Unique
      break
    default:
      break
  }
  return <ImageComponent alt="house" src={ASSETS_URL + houseMetadata[rarity].image} />
}
