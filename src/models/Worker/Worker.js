import { round } from 'utils/general'
import { getWorkerMetadata } from 'utils/getWorkerMetadata'

export class Worker {
  constructor(workerClass, gender) {
    this.workerClass = workerClass
    this.gender = gender
    const { workingReward, workingHours, emblem, rarity, image } = getWorkerMetadata(workerClass)
    this.workingReward = workingReward
    this.workingHours = workingHours
    this.restingHours = workingHours
    this.rarity = rarity
    this.emblem = emblem
    this.image = image
  }

  setEmblemBonus(withEmblemBonus) {
    this.restingHours = withEmblemBonus ? round(this.workingHours * 0.85) : this.workingHours
  }

  clone() {
    return new Worker(this.workerClass, this.gender)
  }

  get withEmblemBonus() {
    return this.restingHours === round(this.workingHours * 0.85)
  }
}
