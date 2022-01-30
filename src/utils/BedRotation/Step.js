import { activities } from '../constants'

export class Step {
  constructor(activity1, activity2, elapsedTime = 0) {
    this.elapsedTime = elapsedTime
    this.activity1 = activity1
    this.activity2 = activity2
  }

  next() {
    const {
      activity1,
      activity2,
      activity1: { timeLeft: timeLeft1, isResting: isResting1, isWorking: isWorking1 },
      activity2: { timeLeft: timeLeft2, isResting: isResting2, isWorking: isWorking2 },
    } = this
    if (this.hasExhausted) {
      if (isResting1) {
        return new Step(activity1.next(timeLeft1), activity2, this.elapsedTime + timeLeft1)
      }
      if (isResting2) {
        return new Step(activity1, activity2.next(timeLeft2), this.elapsedTime + timeLeft2)
      }
      const loss1 = activity1.setLossWaiting(activity2)
      const loss2 = activity2.setLossWaiting(activity1)
      const activity1MustWaitActivity2 = loss2 >= loss1
      if (activity1MustWaitActivity2) {
        const time = isWorking2 ? timeLeft2 : 0
        return new Step(activity1, activity2.next(time), this.elapsedTime + time)
      } else {
        const time = isWorking1 ? timeLeft1 : 0
        return new Step(activity1.next(time), activity2, this.elapsedTime + time)
      }
    }
    const { shorterTimeLeft } = this
    return new Step(
      activity1.next(shorterTimeLeft),
      activity2.next(shorterTimeLeft),
      this.elapsedTime + shorterTimeLeft,
    )
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

  get shorterTimeLeft() {
    const {
      activity1: { timeLeft: timeLeft1 },
      activity2: { type: type2, timeLeft: timeLeft2 },
    } = this
    if (type2 === activities.idle) {
      return timeLeft1
    }
    return timeLeft1 < timeLeft2 ? timeLeft1 : timeLeft2
  }

  get hasExhausted() {
    return this.activity1.isExhausted || this.activity2.isExhausted
  }
}
