import { tiers, rarities } from './constants'

export const houseMetadata = Object.freeze({
  [tiers.tier1]: { capacity: 2, image: 'houses/free1.png' },
  [tiers.tier2]: { capacity: 3, image: 'houses/free2.png' },
  [tiers.tier3]: { capacity: 4, image: 'houses/free3.png' },
  [rarities.common]: { capacity: 10, image: 'houses/common.png' },
  [rarities.uncommon]: { capacity: 15, image: 'houses/uncommon.png' },
  [rarities.rare]: { capacity: 20, image: 'houses/rare.png' },
  [rarities.unique]: { capacity: 25, image: 'houses/unique.png' },
})
