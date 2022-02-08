import { round } from 'utils/general'
import { getWorkerMetadata } from 'utils/getWorkerMetadata'

export class Worker {
  constructor(workerClass, gender) {
    this.workerClass = workerClass
    this.gender = gender
    const { workingReward, workingHours, emblem, rarity } = getWorkerMetadata(workerClass)
    this.workingReward = workingReward
    this.workingHours = workingHours
    this.restingHours = workingHours
    this.rarity = rarity
    this.emblem = emblem
  }

  setEmblemBonus(withEmblemBonus) {
    this.restingHours = withEmblemBonus ? round(this.workingHours * 0.85) : this.workingHours
  }

  get withEmblemBonus() {
    return this.restingHours === round(this.workingHours * 0.85)
  }
}
