import { activities, beds } from '../constants'
import { Activity } from './Activity'
import { Step } from './Step'

export class BedRotation {
  constructor(worker1, worker2) {
    const worker2HasLessWorkingHours = worker2.workingHours < worker1.workingHours
    if (worker2HasLessWorkingHours) [worker1, worker2] = [worker2, worker1]
    this.worker1 = worker1
    this.worker2 = worker2
    this.isViable = this.checkViability()
    if (this.isViable) {
      const activity1 = new Activity(worker1, activities.exhausted)
      const activity2 = new Activity(worker2, activities.working, worker2.workingHours)
      this.currentStep = new Step(activity1, activity2)
      this.steps = [this.currentStep]
      this.run()
    }
  }

  checkViability() {
    const {
      worker1: { workingHours: h1, workingReward: r1 },
      worker2: { workingHours: h2, workingReward: r2 },
    } = this
    return (h2 * r1) / h1 <= (2 * h1 * r2) / h2
  }

  run = () => {
    let maxIteration = 50
    while (!this.isFinished && maxIteration--) {
      this.currentStep = this.currentStep.next()
      this.steps.push(this.currentStep)
    }
    this.cycle = this.currentStep.elapsedTime
    this.regularBed = this.usingBed(beds.regular)
    this.luxuryBed = this.usingBed(beds.luxury)
    this.legendaryRoyalBed = this.usingBed(beds.legendaryRoyal)
    this.bed = [this.regularBed, this.luxuryBed, this.legendaryRoyalBed].sort((a, b) => b.rating - a.rating)[0]
  }

  usingBed({ name, price, hours }) {
    const cyclesPerBed = Math.floor(hours / this.cycle)
    return { name, cyclesPerBed, rating: (cyclesPerBed * this.rewardPerCycle) / price }
  }

  get rewardPerCycle() {
    const {
      worker1: { workingReward: r1 },
      worker2: { workingReward: r2 },
    } = this
    return (r1 + r2) * 0.95 - 0.8
  }

  print() {
    const {
      worker1: { workerClass: workerClass1 },
      worker2: { workerClass: workerClass2 },
    } = this
    console.log(`------ BED ROTATION [${workerClass1}-${workerClass2}] ------`)
    if (!this.isViable) {
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
