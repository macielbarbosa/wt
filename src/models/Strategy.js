import { enumEmblems } from '../utils/constants'
import { uniqueItems } from 'utils/uniqueItems'
import { Bed } from 'models/Bed'

export class Strategy {
  constructor(workers, houses) {
    this.workers = workers
    this.houses = houses
    this.houses.forEach((house) => house.clear())
    this.emblems = uniqueItems(houses.map((house) => house.emblem))

    this.validEmblems = this.emblems.filter((emblem) => emblem && emblem !== enumEmblems.noEmblem)

    this.housesWithEmblem = this.houses.filter((house) => house.hasEmblem)
    const emblemsLobbyAdded = []
    this.housesWithEmblem.forEach((house) => {
      if (emblemsLobbyAdded.includes(house.emblem)) return
      const workersWithEmblem = this.workers.filter((worker) => worker.emblem === house.emblem)
      house.addLobby(...workersWithEmblem)
      emblemsLobbyAdded.push(house.emblem)
    })

    this.freeHouse = houses[0]
    const workersWithoutEmblem = this.workers.filter((worker) => !this.validEmblems.includes(worker.emblem))
    this.freeHouse.addLobby(...workersWithoutEmblem)

    this.makePerfectBedsEmblem()
    this.makePerfectBedsNoEmblem()
    this.makeCrossBeds()

    this.calculateIncome()
  }

  calculateIncome() {
    this.coinsPerDay = 0
    this.houses.forEach((house) => {
      house.beds.forEach((bed) => {
        this.coinsPerDay += bed.profitPerDay
      })
    })
  }

  makePerfectBedsEmblem() {
    this.housesWithEmblem.forEach((house) => {
      const notMatched = []
      while (!house.isLobbyEmpty && !house.isFull) {
        let makeProfitable = false
        let isFreeHouseWorker2 = false
        const worker1 = house.nextWorker()
        let worker2 = house.nextWorker(worker1.workingHours)
        if (!worker2) {
          worker2 = this.freeHouse.nextWorker(worker1.workingHours)
          isFreeHouseWorker2 = true
        }
        if (worker2) {
          makeProfitable = house.addBed(worker1, worker2)
          if (!makeProfitable) {
            if (isFreeHouseWorker2) {
              this.freeHouse.addLobby(worker2)
            } else {
              house.addLobby(worker2)
            }
          }
        }
        if (!makeProfitable) {
          if (worker1.workingHours === 72) {
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
    const notMatched = []
    while (!this.freeHouse.isLobbyEmpty) {
      let makeProfitable = false
      const worker1 = this.freeHouse.nextWorker()
      let worker2 = this.freeHouse.nextWorker(worker1.workingHours)
      if (worker2) {
        makeProfitable = this.freeHouse.addBed(worker1, worker2)
        if (!makeProfitable) {
          this.freeHouse.addLobby(worker2)
        }
      }
      if (!makeProfitable) {
        if (worker1.workingHours === 72) {
          this.freeHouse.addBed(worker1)
        } else {
          notMatched.push(worker1)
        }
      }
    }
    this.freeHouse.addLobby(...notMatched)
  }

  getNotFullHouse(emblem) {
    return this.houses.find((house) => !house.isFull && (emblem ? house.emblem === emblem : true))
  }

  makeCrossBeds() {
    const lobby = []
    this.houses.forEach((house) => {
      house.lobby.forEach((worker) => {
        lobby.push(worker.clone())
      })
      house.clearLobby()
    })
    const workersCombinations = lobby.flatMap((worker1, index) =>
      lobby.slice(index + 1).map((worker2) => {
        return { worker1: worker1.clone(), worker2: worker2.clone() }
      }),
    )
    lobby.forEach((worker) => workersCombinations.push({ worker1: worker.clone() }))
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

    const surplusBedsFreeHouse = this.freeHouse.beds.splice(this.freeHouse.capacity)
    const beds = [...surplusBedsFreeHouse, ...bedsCombinations]
      .filter((bed) => bed.isProfitable)
      .sort((a, b) => b.profitPerDay - a.profitPerDay)
    surplusBedsFreeHouse.forEach((bed) => {
      lobby.push(bed.worker1.clone())
      if (bed.worker2) lobby.push(bed.worker2.clone())
    })

    const notPriority = []
    for (const bed of beds) {
      const { worker1, worker2 } = bed
      const workers = [worker1, worker2].filter((worker) => Boolean(worker))
      const isWorkersInLobby = workers.every(({ workerClass, gender }) =>
        lobby.some((worker) => worker.workerClass === workerClass && worker.gender === gender),
      )
      if (!isWorkersInLobby) {
        continue
      }
      const emblem = worker1.withEmblemBonus
        ? worker1.emblem
        : worker2 && worker2.withEmblemBonus
        ? worker2.emblem
        : enumEmblems.noEmblem

      workers.forEach(({ workerClass, gender }) => {
        const index = lobby.findIndex((worker) => worker.workerClass === workerClass && worker.gender === gender)
        lobby.splice(index, 1)
      })
      const house = this.getNotFullHouse(emblem)
      if (!house) {
        notPriority.push([...workers])
      } else {
        house.addBed(...workers)
      }
    }
    notPriority.forEach((workers) => {
      const house = this.getNotFullHouse()
      if (house) house.addBed(...workers)
    })
  }
}
