import { emblems } from '../../utils/constants'
import { uniqueItems } from 'utils/uniqueItems'
import { Worker } from 'models/Worker'

export class Strategy {
  constructor(workers, houses) {
    this.workers = workers //.sort(higherSalary)
    this.houses = houses
    this.houses.forEach((house) => house.clear())
    this.housesEmblems = uniqueItems(houses.map((house) => house.emblem))
    //console.log('housesEmblems', this.housesEmblems)

    this.emblems = this.housesEmblems.filter((emblem) => emblem && emblem !== emblems.noEmblem)
    //console.log('emblems', this.emblems)

    this.housesWithEmblem = this.houses.filter((house) => house.withEmblem)
    this.housesWithEmblem.forEach((house) => {
      //VERIFICAR QUANDO TEMOS 2 HOUSES COM O MESMO EMBLEMA
      const workersWithEmblem = this.workers.filter((worker) => worker.emblem === house.emblem)
      house.addLobby(workersWithEmblem)
    })

    this.freeHouse = houses[0]
    const workersWithoutEmblem = this.workers.filter((worker) => !this.emblems.includes(worker.emblem))
    this.freeHouse.addLobby(workersWithoutEmblem)

    this.makePerfectBedsEmblem()
    //remover nao profitaveis
    this.makePerfectBedsNoEmblem()
    this.makeCrossBeds()

    console.log('houses', this.houses)
    this.coinsPerDay = 1
    /* this.houses[1].addBed(...workers)
    console.log(this.houses[1].beds[0])
    this.houses[1].beds[0].print() */
  }

  makePerfectBedsEmblem() {
    // console.log('perfect beds emblem')

    this.housesWithEmblem.forEach((house) => {
      const notMatched = []
      while (!house.isLobbyEmpty && !house.isFull) {
        const worker1 = house.nextWorker()
        // console.log('worker -', worker1.workerClass, worker1.workingHours + 'h')
        let worker2 = house.nextWorker(worker1.workingHours)
        if (worker2) {
          // console.log('acho worker na house')
        }
        if (!worker2) {
          // console.log('não achou worker compativel na house')
          worker2 = this.freeHouse.nextWorker(worker1.workingHours)
          if (worker2) {
            // console.log('achou na free house')
          } else {
            // console.log('não achou na free house')
          }
        }
        if (worker2) {
          // console.log('bed [', worker1.workerClass, '-', worker2.workerClass, ']')
          house.addBed(worker1, worker2)
        } else if (worker1.workingHours === 72) {
          // console.log('cama solitaria')
          house.addBed(worker1)
        } else {
          notMatched.push(worker1)
        }
      }
      if (house.isFull) {
        this.freeHouse.addLobby([...house.lobby, ...notMatched])
        house.clearLobby()
      }
      house.addLobby(notMatched)
    })
  }

  makePerfectBedsNoEmblem() {
    // console.log('perfect beds not emblem')
    const notMatched = []
    while (!this.freeHouse.isLobbyEmpty) {
      const worker1 = this.freeHouse.nextWorker()
      // console.log('worker -', worker1.workerClass, worker1.workingHours + 'h')
      let worker2 = this.freeHouse.nextWorker(worker1.workingHours)
      if (worker2) {
        // console.log('bed [', worker1.workerClass, '-', worker2.workerClass, ']')
        this.freeHouse.addBed(worker1, worker2)
      } else if (worker1.workingHours === 72) {
        // console.log('cama solitaria')
        this.freeHouse.addBed(worker1)
      } else {
        notMatched.push(worker1)
      }
    }
    this.freeHouse.addLobby(notMatched)
  }

  makeCrossBeds() {
    const lobby = []
    this.houses.forEach((house) => {
      house.lobby.forEach(({ workerClass, gender }) => {
        console.log({ workerClass, gender })
        const worker = new Worker(workerClass, gender)
        //worker.setEmblemBonus(true)
        lobby.push(worker)
      })
    })
    console.log(lobby)
    const possibleBeds = lobby.flatMap((worker1, index) => lobby.slice(index + 1).map((worker2) => [worker1, worker2]))
    console.log(possibleBeds)
  }
}
