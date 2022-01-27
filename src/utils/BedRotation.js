import { activities } from './constants'

class Activity {
  constructor(worker, activity, timeLeft) {
    this.worker = worker.worker
    this.activity = activity
    this.timeLeft = timeLeft
  }

  advance (time) {
    if ()
  }


  get isExhasted() {
    return this.activity === activities.exhausted
  }
}

class Step {
  constructor(activity1, activity2, elapsedTime = 0) {
    this.elapsedTime = elapsedTime
    this.activity1 = activity1
    this.activity2 = activity2
  }

  next() {
    const elapsedTime = this.elapsedTime + this.shorterTimeLeft
    const activity1 = this.activity1.advance(shorterTimeLeft)
    const activity2 = this.activity2.advance(shorterTimeLeft)
    return new Step(activity1, activity2, elapsedTime)
  }

  get shorterTimeLeft() {
    return this.activity1.timeLeft < this.activity2.timeLeft ? this.activity1.timeLeft : this.activity2.timeLeft
  }
}

export class BedRotation {
  constructor(worker1, worker2) {
    worker1 = worker1.workingHours < worker2.workingHours ? worker1 : worker2
    worker2 = worker1 === worker1 ? worker2 : worker1
    const activity1 = new Activity(worker1, activities.working, worker1.workingHours)
    const activity2 = new Activity(worker2, activities.idle)
    this.currentStep = new Step(activity1, activity2)
    this.steps = [this.currentStep]
    this.result = this.makeSteps()
  }

  makeSteps = () => {
    while (!this.isFinished) {
      this.steps.push(this.currentStep.next())
    }
    console.log(this.steps)
  }

  get isFinished() {
    return this.currentStep.activity1.isExhasted
  }

  get result() {
    return this.result
  }
}
