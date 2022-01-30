import { activities } from '../constants'

export class Step {
  constructor(activity1, activity2, elapsedTime = 0) {
    this.elapsedTime = elapsedTime
    this.activity1 = activity1
    this.activity2 = activity2
  }

  newStep(...params) {
    const elapsedTime = this.elapsedTime + this.shorterTimeLeft
    return new Step(...params, elapsedTime)
  }

  nextActivity(activity) {
    return activity.next(this.shorterTimeLeft)
  }

  next() {
    if (this.hasExhausted) {
      if (this.activity1.isResting) {
        return this.advanceActivity1()
      }
      if (this.activity2.isResting) {
        return this.advanceActivity2()
      }
      const loss1 = this.activity1.setLossWaiting(this.activity2)
      const loss2 = this.activity2.setLossWaiting(this.activity1)
      const activity1MustWaitActivity2 = loss2 >= loss1
      if (activity1MustWaitActivity2) {
        return this.advanceActivity2()
      } else {
        return this.advanceActivity1()
      }
    }
    return this.advanceBothActivities()
  }

  advanceActivity1() {
    return this.newStep(this.nextActivity(this.activity1), this.activity2)
  }

  advanceActivity2() {
    return this.newStep(this.activity1, this.nextActivity(this.activity2))
  }

  advanceBothActivities() {
    return this.newStep(this.nextActivity(this.activity1), this.nextActivity(this.activity2))
  }

  get hasExhausted() {
    return this.activity1.isExhausted || this.activity2.isExhausted
  }

  get hasResting() {
    return this.activity1.isResting || this.activity2.isResting
  }

  get restingActivity() {
    return this.activity1.isResting ? this.activity1 : this.activity2
  }

  get shorterTimeLeft() {
    const {
      activity1: { timeLeft: timeLeftActivity1 },
      activity2: { type: typeActivity2, timeLeft: timeLeftActivity2 },
    } = this
    if (typeActivity2 === activities.idle) {
      return timeLeftActivity1
    }
    if (this.hasExhausted && this.hasResting) {
      return this.restingActivity.timeLeft
    }
    return timeLeftActivity1 < timeLeftActivity2 ? timeLeftActivity1 : timeLeftActivity2
  }

  print() {
    const {
      activity1: { type: type1, timeLeft: timeLeft1, lossWaiting: loss1 },
      activity2: { type: type2, timeLeft: timeLeft2, lossWaiting: loss2 },
      elapsedTime,
    } = this
    console.log(
      timeLeft1 ? timeLeft1 + 'h' : ' ',
      `${type1} ------ ${elapsedTime}h ------ ${type2}`,
      Boolean(timeLeft2) ? `- ${timeLeft2}h` : '',
    )
    if (this.hasExhausted && loss1 && loss2) {
      console.log(`${loss1} COINS -- Loss waiting -- ${loss2} COINS`)
    }
  }
}
