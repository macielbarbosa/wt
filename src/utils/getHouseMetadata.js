import { tiers, rarities } from './constants'

const houseDictionary = Object.freeze({
  [tiers.tier1]: { capacity: 2 },
  [tiers.tier2]: { capacity: 3 },
  [tiers.tier3]: { capacity: 4 },
  [rarities.common]: { capacity: 10 },
  [rarities.uncommon]: { capacity: 15 },
  [rarities.rare]: { capacity: 20 },
  [rarities.unique]: { capacity: 25 },
})

export const getHouseMetadata = (metadata) => houseDictionary[metadata]
