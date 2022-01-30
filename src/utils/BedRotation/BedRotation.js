import { activities } from '../constants'
import { Activity } from './Activity'
import { Step } from './Step'

export class BedRotation {
  constructor(worker1, worker2) {
    const worker2HasLessWorkingHours = worker2.workingHours < worker1.workingHours
    if (worker2HasLessWorkingHours) [worker1, worker2] = [worker2, worker1]
    const activity1 = new Activity(worker1, activities.working, worker1.workingHours)
    const activity2 = new Activity(worker2, activities.idle)
    this.currentStep = new Step(activity1, activity2)
    this.steps = [this.currentStep]
    this.run()
  }

  run = () => {
    let maxIteration = 100
    while (!this.isFinished && maxIteration--) {
      this.currentStep = this.currentStep.next()
      this.steps.push(this.currentStep)
    }
    this.cycle = this.currentStep.elapsedTime - this.currentStep.activity1.worker.workingHours

    this.print()
  }

  print() {
    const {
      activity1: {
        worker: { workerClass: workerClass1 },
      },
      activity2: {
        worker: { workerClass: workerClass2 },
      },
    } = this.currentStep
    console.log(`------ BED ROTATION [${workerClass1}-${workerClass2}] ------`)
    this.steps.forEach((step) => {
      step.print()
    })
    console.log(`Cycle = ${this.cycle}h`)
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
