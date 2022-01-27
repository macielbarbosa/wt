import { activities } from '../constants'

export class Activity {
  constructor(worker, type, timeLeft) {
    this.worker = worker
    this.type = type
    this.timeLeft = timeLeft
  }

  next(time) {
    if (this.type === activities.idle) {
      return new Activity(this.worker, activities.working, this.worker.workingHours)
    }
    if (this.type === activities.working) {
      if (this.timeLeft <= time) {
        return new Activity(this.worker, activities.resting, this.worker.workingHours)
      }
      return new Activity(this.worker, activities.working, this.worker.workingHours - time)
    }
    if (this.type === activities.resting) {
      if (this.timeLeft === time) {
        return new Activity(this.worker, activities.working, this.worker.workingHours)
      }
      return new Activity(this.worker, activities.resting, this.timeLeft - time)
    }
  }

  get isExhasted() {
    return this.type === activities.exhausted
  }
}
