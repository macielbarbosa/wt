import { activities } from '../constants'

export class Step {
  constructor(activity1, activity2, elapsedTime = 0) {
    this.elapsedTime = elapsedTime
    this.activity1 = activity1
    this.activity2 = activity2
  }

  next() {
    if (this.activity1.mustWaitForActivityToRest(this.activity2)) {
      const elapsedTime = this.elapsedTime + this.shorterTimeLeft
      return new Step(this.activity1, this.activity2.next(), elapsedTime)
    }
    if (this.activity2.mustWaitForActivityToRest(this.activity1)) {
      const elapsedTime = this.elapsedTime + this.shorterTimeLeft
      return new Step(this.activity1.next(), this.activity2, elapsedTime)
    }
    const elapsedTime = this.elapsedTime + this.shorterTimeLeft
    const activity1 = this.activity1.next(this.shorterTimeLeft)
    const activity2 = this.activity2.next(this.shorterTimeLeft)
    return new Step(activity1, activity2, elapsedTime)
  }

  get shorterTimeLeft() {
    const {
      activity1: { type: typeActivity1, timeLeft: timeLeftActivity1 },
      activity2: { type: typeActivity2, timeLeft: timeLeftActivity2 },
    } = this
    if (typeActivity2 === activities.idle) {
      return timeLeftActivity1
    }
    const hasExhausted = typeActivity1.isExhausted || typeActivity2.isExhausted
    if (hasExhausted) {
      return 0
    }
    return timeLeftActivity1 < timeLeftActivity2 ? timeLeftActivity1 : timeLeftActivity2
  }

  print() {
    const {
      activity1: { type: type1, timeLeft: timeLeft1 },
      activity2: { type: type2, timeLeft: timeLeft2 },
      elapsedTime,
    } = this
    console.log(
      timeLeft1 ? timeLeft1 + 'h' : ' ',
      `${type1} ------ ${elapsedTime}h ------ ${type2}`,
      Boolean(timeLeft2) ? `- ${timeLeft2}h` : '',
    )
  }
}
