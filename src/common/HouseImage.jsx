import React from 'react'
import { styled } from '@mui/system'

import { ASSETS_URL, rarities, tiers } from 'utils/constants'
import { houseMetadata } from 'utils/houseMetadata'

const ImageSize1 = styled('img')({
  width: 200,
  padding: '0px 0px',
  margin: '-45px -25px 0px',
})

const ImageSize2 = styled('img')({
  width: 200,
  padding: '0px 0px',
  margin: '-10px -25px 0px',
})

const ImageSize3 = styled('img')({
  width: 150,
  padding: '0px 0px',
  margin: '-15px 0px 0px',
})

const ImageSize4 = styled('img')({
  width: 150,
  padding: '0px 0px',
  margin: '0px 0px 0px',
})

export const HouseImage = ({ rarity }) => {
  const props = { src: ASSETS_URL + houseMetadata[rarity].image }
  switch (rarity) {
    case tiers.tier1:
    case tiers.tier2:
    case rarities.common:
      return <ImageSize1 {...props} />
    case rarities.uncommon:
      return <ImageSize2 {...props} />
    case tiers.tier3:
    case rarities.rare:
      return <ImageSize3 {...props} />
    case rarities.unique:
      return <ImageSize4 {...props} />
  }
}
