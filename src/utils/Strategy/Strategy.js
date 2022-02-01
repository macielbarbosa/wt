import { BedRotation } from '../BedRotation/index'
import { emblems, workHours } from '../constants'
import { Lobby } from './Lobby'

const higherSalary = (w1, w2) => w2.workingReward / w2.workingHours - w1.workingReward / w1.workingHours

export class Strategy {
  constructor(workers, houses) {
    this.workers = workers.sort(higherSalary)
    this.housesEmblems = houses.slice(1).map((house) => house.emblem)
    console.log('housesEmblems', this.housesEmblems)

    this.housesWithEmblem = this.housesEmblems.filter((emblem) => emblem !== emblems.noEmblem)
    console.log('housesWithEmblem', this.housesWithEmblem)

    this.lobbies = this.housesEmblems.map((houseEmblem) => {
      const workersWithEmblem = this.workers.filter((worker) => {
        const hasEmblem = worker.emblem === houseEmblem
        const hasWorkerEmblem = this.housesWithEmblem.includes(worker.emblem)
        return hasEmblem || (houseEmblem === emblems.noEmblem && !hasWorkerEmblem)
      })
      return new Lobby(workersWithEmblem, houseEmblem)
    })
    console.log('lobbies', this.lobbies)
    this.coinsPerDay = 1
    /* const bedsByEmblems = workersByEmblems.map((workersByEmblem) => {
      const beds = []
      workHours.forEach((workHour) => {
        const worker1 = workersByEmblem.find((worker) => worker.workingHours === workHour)
      })
    })
    console.log('bedsByEmblems', bedsByEmblems) */
  }

  // console.log('--------------------------------------------------')
}

// console.clear()
/*const bedRotation = new BedRotation(
    /* {
      workerClass: 'Bandit',
      gender: 'Male',
      rarity: 'Common',
      workingReward: 24,
      workingHours: 6,
      emblem: 'Villain',
    }, */
/*  {
      workerClass: 'Villager',
      gender: 'Female',
      rarity: 'Common',
      workingReward: 48,
      workingHours: 12,
      emblem: 'Citizen',
    }, */
/* {
      workerClass: 'Fisherman',
      gender: 'Male',
      rarity: 'Uncommon',
      workingReward: 108,
      workingHours: 18,
      emblem: 'Union',
    },
    {
      workerClass: 'Builder',
      gender: 'Male',
      rarity: 'Uncommon',
      workingReward: 144,
      workingHours: 24,
      emblem: 'Union',
    }, */
/* {
      workerClass: 'Inn Keeper',
      gender: 'Male',
      rarity: 'Common',
      workingReward: 96,
      workingHours: 24,
      emblem: 'Citizen',
    }, */
/* {
      workerClass: 'Young',
      gender: 'Male',
      rarity: 'Common',
      workingReward: 144,
      workingHours: 36,
      emblem: 'Citizen',
    }, */
/* {
      workerClass: 'Queen',
      gender: 'Female',
      rarity: 'Legendary',
      workingReward: 672,
      workingHours: 24,
      emblem: 'Royal',
    }, */
/* {
      workerClass: 'Pirate',
      gender: 'Male',
      rarity: 'Common',
      workingReward: 192,
      workingHours: 48,
      emblem: 'Villain',
    }, */
/* {
      workerClass: 'Old',
      gender: 'Male',
      rarity: 'Common',
      workingReward: 288,
      workingHours: 72,
      emblem: 'Citizen',
    }, 
  )*/
// bedRotation.print()