import { bedWorkerLonely, bestRating } from 'utils/bed'
import { round } from 'utils/general'
import { activities, beds } from '../../utils/constants'
import { Activity } from './Activity'
import { Step } from './Step'

export class Bed {
  constructor(worker1, worker2) {
    this.isLonely = !worker2
    this.profitPerDay = 0
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
  }

  makePair() {
    this.isProfitable = this.checkPairViability()
    this.isSameWorkingHours = this.worker1.workingHours === this.worker2.workingHours
    if (this.isProfitable) {
      const activity1 = new Activity(this.worker1, activities.exhausted)
      const activity2 = new Activity(this.worker2, activities.working, this.worker2.workingHours)
      this.currentStep = new Step(activity1, activity2)
      this.steps = [this.currentStep]
      this.setRewardPerCycle()
      this.simulateRotation()
      this.chooseBed()
      this.setProfitPerDay()
    }
  }

  makeLonely() {
    const { workingHours, restingHours } = this.worker1
    this.type = bedWorkerLonely(this.worker1)
    this.cycle = workingHours + restingHours
    this.setRewardPerCycle()
    this.setProfitPerDay()
    this.isProfitable = this.profitPerDay > 0
    this.steps = []
  }

  checkPairViability() {
    const {
      worker1: { workingHours: h1, restingHours: r1, workingReward: wr1 },
      worker2: { workingHours: h2, restingHours: r2, workingReward: wr2 },
    } = this
    const maxLossWaitingWorker2 = r2 * (wr1 / h1)
    const maxLossWaitingWorker1 = (h1 + r1) * (wr2 / h2)
    return r1 === r2 || maxLossWaitingWorker2 <= maxLossWaitingWorker1
  }

  simulateRotation() {
    let maxIteration = 50
    while (!this.isFinished && maxIteration--) {
      this.currentStep = this.currentStep.next()
      this.steps.push(this.currentStep)
    }
    const { elapsedTime } = this.currentStep
    this.cycle = elapsedTime / (this.isSameWorkingHours ? 2 : 1)
  }

  chooseBed() {
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

  setRewardPerCycle() {
    const {
      worker1: { workingReward: r1, workerClass: workerClass1 },
    } = this
    const r2 = this.isLonely ? 0 : this.worker2.workingReward
    const workerClass2 = this.isLonely ? undefined : this.worker2.workerClass
    const isSameWorker = workerClass1 === workerClass2
    const result =
      this.isLonely || isSameWorker
        ? r1 * 0.95 - 0.4
        : this.isSameWorkingHours
        ? ((r1 + r2) / 2) * 0.95 - 0.4
        : (r1 + r2) * 0.95 - 0.8
    this.rewardPerCycle = round(result)
  }

  setProfitPerDay() {
    const totalReward = this.type.cycles * this.rewardPerCycle
    const days = (this.cycle * this.type.cycles) / 24
    this.profitPerDay = Math.round((totalReward - this.type.price) / days)
  }

  get isFinished() {
    if (this.isLonely) return true
    const {
      activity1: {
        type: typeActivity1,
        timeLeft: timeLeftActivity1,
        worker: { restingHours: restingHours1 },
      },
      activity2: {
        type: typeActivity2,
        timeLeft: timeLeftActivity2,
        worker: { workingHours: workingHours2 },
      },
      elapsedTime,
    } = this.currentStep
    return (
      timeLeftActivity1 === restingHours1 &&
      typeActivity1 === activities.resting &&
      elapsedTime > restingHours1 &&
      typeActivity2 === activities.working &&
      timeLeftActivity2 === workingHours2
    )
  }

  print() {
    const {
      worker1: { workerClass: workerClass1 },
      worker2,
    } = this
    const workerClass2 = worker2 ? worker2.workerClass : 'Lonely'
    console.log(`------ BED ROTATION [${workerClass1}-${workerClass2}] ------`)
    if (!this.isProfitable) {
      console.log('Not profitable.')
      return
    }
    this.steps.forEach((step) => {
      step.print()
    })
    console.log(`Cycle = ${this.cycle}h`)
    console.log('Bed = ', this.type.name)
  }
}
