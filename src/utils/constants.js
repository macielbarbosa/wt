export const enumEmblems = Object.freeze({
  noEmblem: 'No Emblem',
  royal: 'Royal',
  citizen: 'Citizen',
  warrior: 'Warrior',
  villain: 'Villain',
  exile: 'Exile',
  protector: 'Protector',
  enchanter: 'Enchanter',
  union: 'Union',
})

export const tiers = Object.freeze({
  tier1: 'Tier 1',
  tier2: 'Tier 2',
  tier3: 'Tier 3',
})

export const rarities = Object.freeze({
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  unique: 'Unique',
  legendary: 'Legendary',
})

export const beds = Object.freeze({
  regular: {
    name: 'Regular Bed',
    price: 135,
    hours: 72,
  },
  luxury: {
    name: 'Luxury Bed',
    price: 250,
    hours: 144,
  },
  legendaryRoyal: {
    name: 'Legendary Royal Bed',
    price: 350,
    hours: 216,
  },
})

export const genders = Object.freeze({
  male: 'Male',
  female: 'Female',
})

export const workingHoursList = [72, 48, 36, 24, 18, 12, 8, 6]

export const houseRarities = [rarities.common, rarities.uncommon, rarities.rare, rarities.unique]

export const workerClasses = Object.freeze({
  bandit: 'Bandit',
  villager: 'Villager',
  innKeeper: 'Inn Keeper',
  young: 'Young',
  pirate: 'Pirate',
  old: 'Old',
  blacksmith: 'Blacksmith',
  miner: 'Miner',
  fisherman: 'Fisherman',
  builder: 'Builder',
  farmer: 'Farmer',
  adventurer: 'Adventurer',
  banditLeader: 'Bandit Leader',
  bard: 'Bard',
  dancer: 'Dancer',
  mage: 'Mage',
  archer: 'Archer',
  gladiator: 'Gladiator',
  priestess: 'Priestess',
  pirateLeader: 'Pirate Leader',
  ninja: 'Ninja',
  cult: 'Cult',
  alchemist: 'Alchemist',
  royalGuard: 'Royal Guard',
  knight: 'Knight',
  thief: 'Thief',
  rogue: 'Rogue',
  //paladin: 'Paladin',
  santaClaus: 'Santa Claus',
  necromancer: 'Necromancer',
  plagueDoctor: 'Plague Doctor',
  prince: 'Prince',
  princess: 'Princess',
  king: 'King',
  queen: 'Queen',
})

export const multipleGenders = [
  workerClasses.old,
  workerClasses.young,
  workerClasses.pirate,
  workerClasses.bandit,
  workerClasses.adventurer,
  workerClasses.mage,
  workerClasses.ninja,
  workerClasses.cult,
  workerClasses.alchemist,
  workerClasses.royalGuard,
  workerClasses.necromancer,
  workerClasses.plagueDoctor,
]

export const activities = Object.freeze({
  idle: 'Idle',
  working: 'Working',
  exhausted: 'Exhausted',
  resting: 'Resting',
})

export const ASSETS_URL = 'https://static.worker.town/assets/v1/'

export const bedsImages = {
  'Regular Bed': 'beds/regular.png',
  'Luxury Bed': 'beds/luxury.png',
  'Legendary Royal Bed': 'beds/royal.png',
}
