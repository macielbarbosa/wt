import { Bed } from 'models/Bed'
import { getHouseMetadata } from 'utils/getHouseMetadata'
import { higherSalary } from 'utils/higherSalary'
import { emblems } from '../../utils/constants'

export class House {
  constructor(rarity, emblem = emblems.noEmblem) {
    this.rarity = rarity
    this.emblem = emblem
    this.capacity = getHouseMetadata(rarity).capacity
    this.lobby = []
    this.beds = []
    this.hasEmblem = this.emblem !== emblems.noEmblem
  }

  addLobby(workers) {
    this.lobby.push(...workers)
    this.lobby.sort(higherSalary)
  }

  addBed(...workers) {
    workers.forEach((worker) => {
      worker.setEmblemBonus(worker.emblem === this.emblem)
    })
    this.beds.push(new Bed(...workers))
  }

  clearLobby() {
    this.lobby = []
  }

  clear() {
    this.beds = []
    this.clearLobby()
  }

  nextWorker(workingHours = false) {
    if (workingHours) {
      const index = this.lobby.findIndex((worker) => worker.workingHours === workingHours)
      if (index >= 0) {
        return this.lobby.splice(index, 1)[0]
      } else {
        return null
      }
    }
    return this.lobby.shift()
  }

  get isLobbyEmpty() {
    return this.lobby.length === 0
  }

  get isFull() {
    return this.beds.length >= this.capacity
  }

  get isSurplusBed() {
    return this.beds.length > this.capacity
  }
}
