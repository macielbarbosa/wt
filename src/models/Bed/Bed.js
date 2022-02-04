import { bedToLonely, bestRating, costPerDay } from 'utils/bed'
import { activities, beds } from '../../utils/constants'
import { Activity } from './Activity'
import { Step } from './Step'

export class Bed {
  constructor(worker1, worker2) {
    this.isLonely = !worker2
    if (worker2) {
      const worker2HasLessWorkingHours = worker2.workingHours < worker1.workingHours
      if (worker2HasLessWorkingHours) [worker1, worker2] = [worker2, worker1]
      this.worker1 = worker1
      this.worker2 = worker2
      this.makePair()
    } else {
      this.worker1 = worker1
      this.makeLonely()
    }
    this.profitPerDay = this.isProfitable
      ? Math.round((24 / this.cycle) * this.rewardPerCycle - costPerDay(this.type))
      : 0
  }

  makePair() {
    this.isProfitable = this.checkPairViability()
    if (this.isProfitable) {
      const activity1 = new Activity(this.worker1, activities.exhausted)
      const activity2 = new Activity(this.worker2, activities.working, this.worker2.workingHours)
      this.currentStep = new Step(activity1, activity2)
      this.steps = [this.currentStep]
      this.simulate()
    }
  }

  makeLonely() {
    const { workingHours } = this.worker1
    this.cycle = workingHours
    this.type = bedToLonely(workingHours)
    // checar isso
    this.isProfitable = true
  }

  checkPairViability() {
    const {
      worker1: { workingHours: h1, workingReward: r1 },
      worker2: { workingHours: h2, workingReward: r2 },
    } = this
    return (h2 * r1) / h1 <= (2 * h1 * r2) / h2
  }

  simulate = () => {
    let maxIteration = 50
    while (!this.isFinished && maxIteration--) {
      this.currentStep = this.currentStep.next()
      this.steps.push(this.currentStep)
    }
    const { elapsedTime } = this.currentStep
    this.cycle = this.worker1.workingHours === this.worker2.workingHours ? elapsedTime / 2 : elapsedTime
    this.regularBed = this.usingBed(beds.regular)
    this.luxuryBed = this.usingBed(beds.luxury)
    this.legendaryRoyalBed = this.usingBed(beds.legendaryRoyal)
    this.type = bestRating([this.regularBed, this.luxuryBed, this.legendaryRoyalBed])
  }

  usingBed(bed) {
    const { price, hours } = bed
    const cycles = Math.floor(hours / this.cycle)
    return { ...bed, cycles, rating: (cycles * this.rewardPerCycle) / price }
  }

  get rewardPerCycle() {
    const {
      worker1: { workingReward: r1, workingHours: h1 },
    } = this
    const r2 = this.isLonely ? 0 : this.worker2.workingReward
    const h2 = this.isLonely ? 0 : this.worker2.workingHours
    return ((r1 + r2) * 0.95 - (this.isLonely ? 0.4 : 0.8)) / (h1 === h2 ? 2 : 1)
  }

  print() {
    const {
      worker1: { workerClass: workerClass1 },
      worker2: { workerClass: workerClass2 },
    } = this
    console.log(`------ BED ROTATION [${workerClass1}-${workerClass2}] ------`)
    if (!this.isProfitable) {
      console.log('Not viable. Send only', workerClass1, 'to work.')
      return
    }
    this.steps.forEach((step) => {
      step.print()
    })
    console.log(`Cycle = ${this.cycle}h`)
    console.log('Bed = ', this.bed.name)
  }

  get isFinished() {
    const {
      activity1: {
        type: typeActivity1,
        timeLeft: timeLeftActivity1,
        worker: { workingHours: workingHours1 },
      },
      activity2: {
        type: typeActivity2,
        timeLeft: timeLeftActivity2,
        worker: { workingHours: workingHours2 },
      },
      elapsedTime,
    } = this.currentStep
    return (
      timeLeftActivity1 === workingHours1 &&
      typeActivity1 === activities.resting &&
      elapsedTime > workingHours1 &&
      typeActivity2 === activities.working &&
      timeLeftActivity2 === workingHours2
    )
  }
}
