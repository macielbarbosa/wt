import { getWorkerMetadata } from 'utils/getWorkerMetadata'

export class Worker {
  constructor(workerClass, gender) {
    this.workerClass = workerClass
    this.gender = gender
    const { workingReward, workingHours, emblem, rarity } = getWorkerMetadata(workerClass)
    this.workingReward = workingReward
    this.workingHours = workingHours
    this.rarity = rarity
    this.emblem = emblem
  }
}
