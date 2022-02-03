import { activities } from '../../utils/constants'

export class Activity {
  constructor(worker, type, timeLeft = 0) {
    this.worker = worker
    this.type = type
    this.timeLeft = timeLeft
    this.lossWaiting = null
  }

  newActivity = (...params) => new Activity(this.worker, ...params)

  next(time = this.timeLeft) {
    switch (this.type) {
      case activities.idle:
        return this.newActivity(activities.working, this.worker.workingHours)
      case activities.working: {
        if (time === this.timeLeft) {
          return this.newActivity(activities.exhausted)
        }
        return this.newActivity(activities.working, this.timeLeft - time)
      }
      case activities.exhausted: {
        return this.newActivity(activities.resting, this.worker.workingHours)
      }
      case activities.resting: {
        if (this.timeLeft === time) {
          return this.newActivity(activities.working, this.worker.workingHours)
        }
        return this.newActivity(activities.resting, this.timeLeft - time)
      }
      default:
        return this
    }
  }

  get timeToFinishRest() {
    switch (this.type) {
      case activities.working:
        return this.timeLeft + this.worker.workingHours
      case activities.exhausted:
        return this.worker.workingHours
      default:
        return this.timeLeft
    }
  }

  setLossWaiting(activity) {
    const { workingReward, workingHours } = this.worker
    this.lossWaiting = (activity.timeToFinishRest * workingReward) / workingHours
    return this.lossWaiting
  }

  get isExhausted() {
    return this.type === activities.exhausted
  }

  get isResting() {
    return this.type === activities.resting
  }

  get isWorking() {
    return this.type === activities.working
  }
}
