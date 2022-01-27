import { activities } from '../constants'

export class Step {
  constructor(activity1, activity2, elapsedTime = 0) {
    this.elapsedTime = elapsedTime
    this.activity1 = activity1
    this.activity2 = activity2
  }

  next() {
    const { shorterTimeLeft } = this
    // console.log(shorterTimeLeft)
    const elapsedTime = this.elapsedTime + shorterTimeLeft
    const activity1 = this.activity1.next(shorterTimeLeft, this.activity2)
    const activity2 = this.activity2.next(shorterTimeLeft, this.activity1)
    return new Step(activity1, activity2, elapsedTime)
  }

  get shorterTimeLeft() {
    const {
      activity1: { type: typeActivity1, timeLeft: timeLeftActivity1 },
      activity2: { type: typeActivity2, timeLeft: timeLeftActivity2 },
    } = this
    if (typeActivity2 === activities.idle) {
      //console.log('motivo 2')
      return timeLeftActivity1
    }
    if (typeActivity1 === activities.resting) {
      //console.log('motivo 3')
      return timeLeftActivity1
    }
    if (typeActivity2 === activities.resting) {
      //console.log('motivo 4')
      return timeLeftActivity2
    }
    //console.log('motivo 5')
    return timeLeftActivity1 < timeLeftActivity2 ? timeLeftActivity1 : timeLeftActivity2
  }

  print() {
    const {
      activity1: { type: type1, timeLeft: timeLeft1 },
      activity2: { type: type2, timeLeft: timeLeft2 },
      elapsedTime,
    } = this
    console.log(
      `${timeLeft1}h - ${type1} ------ ${elapsedTime}h ------ ${type2}`,
      Boolean(timeLeft2) ? `- ${timeLeft2}h` : '',
    )
  }
}
