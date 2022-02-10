import { enumEmblems } from '../../utils/constants'
import { uniqueItems } from 'utils/uniqueItems'
import { Bed } from 'models/Bed'

export class Strategy {
  constructor(workers, houses) {
    this.workers = workers //.sort(higherSalary)
    //console.log(workers)
    this.houses = houses
    this.houses.forEach((house) => house.clear())
    this.emblems = uniqueItems(houses.map((house) => house.emblem))
    //console.log('housesEmblems', this.emblems)

    this.validEmblems = this.emblems.filter((emblem) => emblem && emblem !== enumEmblems.noEmblem)
    //console.log('valid emblems', this.validEmblems)

    this.housesWithEmblem = this.houses.filter((house) => house.hasEmblem)
    //console.log('housesWithEmblem', this.housesWithEmblem)
    this.housesWithEmblem.forEach((house) => {
      //VERIFICAR QUANDO TEMOS 2 HOUSES COM O MESMO EMBLEMA
      const workersWithEmblem = this.workers.filter((worker) => worker.emblem === house.emblem)
      house.addLobby(...workersWithEmblem)
    })

    this.freeHouse = houses[0]
    const workersWithoutEmblem = this.workers.filter((worker) => !this.validEmblems.includes(worker.emblem))
    this.freeHouse.addLobby(...workersWithoutEmblem)

    this.makePerfectBedsEmblem()
    this.makePerfectBedsNoEmblem()
    this.makeCrossBeds()
    this.relocateSurplusBed()

    console.log('houses', this.houses)
    console.log(
      'a\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\n',
    )
    this.coinsPerDay = 1
    if (workers.length > 0) {
      console.log(this.houses[0].beds[0])
      this.houses[0].beds[0].print()
    }
  }

  makePerfectBedsEmblem() {
    // console.log('perfect beds emblem')

    this.housesWithEmblem.forEach((house) => {
      const notMatched = []
      while (!house.isLobbyEmpty && !house.isFull) {
        let makeProfitable = false
        let isFreeHouseWorker2 = false
        const worker1 = house.nextWorker()
        // console.log('worker -', worker1.workerClass, worker1.workingHours + 'h')
        let worker2 = house.nextWorker(worker1.workingHours)
        if (!worker2) {
          // console.log('não achou worker compativel na house')
          worker2 = this.freeHouse.nextWorker(worker1.workingHours)
          isFreeHouseWorker2 = true
        }
        if (worker2) {
          // console.log('bed [', worker1.workerClass, '-', worker2.workerClass, ']')
          makeProfitable = house.addBed(worker1, worker2)
          if (!makeProfitable) {
            // console.log('not profitable')
            if (isFreeHouseWorker2) {
              this.freeHouse.addLobby(worker2)
            } else {
              house.addLobby(worker2)
            }
          }
        }
        if (!makeProfitable) {
          if (worker1.workingHours === 72) {
            // console.log('cama solitaria')
            house.addBed(worker1)
          } else {
            notMatched.push(worker1)
          }
        }
      }
      if (house.isFull) {
        this.freeHouse.addLobby(...house.lobby, ...notMatched)
        house.clearLobby()
      } else {
        house.addLobby(...notMatched)
      }
    })
  }

  makePerfectBedsNoEmblem() {
    // console.log('perfect beds not emblem')
    const notMatched = []
    while (!this.freeHouse.isLobbyEmpty) {
      let makeProfitable = false
      const worker1 = this.freeHouse.nextWorker()
      // console.log('worker -', worker1.workerClass, worker1.workingHours + 'h')
      let worker2 = this.freeHouse.nextWorker(worker1.workingHours)
      if (worker2) {
        // console.log('bed [', worker1.workerClass, '-', worker2.workerClass, ']')
        makeProfitable = this.freeHouse.addBed(worker1, worker2)
        if (!makeProfitable) {
          this.freeHouse.addLobby(worker2)
        }
      }
      if (!makeProfitable) {
        if (worker1.workingHours === 72) {
          // console.log('cama solitaria')
          this.freeHouse.addBed(worker1)
        } else {
          notMatched.push(worker1)
        }
      }
    }
    this.freeHouse.addLobby(...notMatched)
  }

  getNotFullHousesByEmblem(emblem) {
    return this.houses.find((house) => house.emblem === emblem && !house.isFull)
  }

  makeCrossBeds() {
    const lobby = []
    this.houses.forEach((house) => {
      house.lobby.forEach((worker) => {
        lobby.push(worker.clone())
      })
      house.clearLobby()
    })
    //console.log(lobby)
    const workersCombinations = lobby.flatMap((worker1, index) =>
      lobby.slice(index + 1).map((worker2) => {
        return { worker1: worker1.clone(), worker2: worker2.clone() }
      }),
    )
    lobby.forEach((worker) => workersCombinations.push({ worker1: worker.clone() }))
    //console.log('lobby', lobby)
    //console.log(workersCombinations)
    const bedsCombinations = []
    const housesNotFull = this.houses.filter((house) => !house.isFull)
    const houseEmblemsNotFull = housesNotFull.map((house) => house.emblem)
    workersCombinations.forEach((combination) => {
      const {
        worker1,
        worker2,
        worker1: { emblem: emblem1 },
      } = combination
      const combinationEmblems = [emblem1, worker2 ? worker2.emblem : undefined]
      const emblems = [
        enumEmblems.noEmblem,
        ...houseEmblemsNotFull.filter((emblem) => combinationEmblems.includes(emblem)),
      ]
      emblems.forEach((emblem) => {
        const clone1 = worker1.clone()
        const clone2 = worker2 ? worker2.clone() : undefined
        clone1.setEmblemBonus(clone1.emblem === emblem)
        if (worker2) {
          clone2.setEmblemBonus(clone2.emblem === emblem)
        }
        bedsCombinations.push(new Bed(clone1, clone2))
      })
    })
    const beds = bedsCombinations.filter((bed) => bed.isProfitable).sort((a, b) => b.profitPerDay - a.profitPerDay)
    //console.log(beds)
    for (const bed of beds) {
      const { worker1, worker2 } = bed
      const workers = [worker1, worker2].filter((worker) => Boolean(worker))
      //console.log('workers', workers)
      const isWorkersInLobby = workers.every(({ workerClass, gender }) =>
        lobby.some((worker) => worker.workerClass === workerClass && worker.gender === gender),
      )
      //console.log('isWorkersInLobby', isWorkersInLobby)
      if (!isWorkersInLobby) {
        continue
      }
      const emblem = worker1.withEmblemBonus
        ? worker1.emblem
        : worker2 && worker2.withEmblemBonus
        ? worker2.emblem
        : enumEmblems.noEmblem
      const house = this.getNotFullHousesByEmblem(emblem)
      house.addBed(...workers)
      workers.forEach(({ workerClass, gender }) => {
        const index = lobby.findIndex((worker) => worker.workerClass === workerClass && worker.gender === gender)
        //console.log(index)
        lobby.splice(index, 1)
      })
    }
  }

  relocateSurplusBed() {
    if (!this.freeHouse.isSurplusBed) return
    const notFreeHouses = this.houses.filter((house) => !house.isFree)
    for (const house of notFreeHouses) {
      while (!house.isFull && this.freeHouse.isSurplusBed) {
        const { worker1, worker2 } = this.freeHouse.beds.pop()
        house.addBed(worker1, worker2)
      }
    }
  }
}
