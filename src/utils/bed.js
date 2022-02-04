import { beds } from 'utils/constants'
import { isEvenNumber } from './general'

export const getCycles = (workingHours, bedHours) => {
  const factor = Math.floor(bedHours / workingHours)
  return isEvenNumber(factor) ? Math.floor(factor / 2) : Math.ceil(factor / 2)
}

export const bedToLonely = (workingHours) => {
  switch (workingHours) {
    case 72:
      return { ...beds.regular, cycles: 1 }
    case 48:
      return { ...beds.luxury, cycles: 2 }
    case 6:
      return { ...beds.legendaryRoyal, cycles: 18 }
    default:
      return { ...beds.legendaryRoyal, cycles: getCycles(workingHours, beds.legendaryRoyal.hours) }
  }
}

export const costPerDay = ({ name }) => {
  switch (name) {
    case beds.regular.name:
      return beds.regular.price / 3
    case beds.luxury.name:
      return beds.luxury.price / 6
    case beds.legendaryRoyal.name:
      return beds.legendaryRoyal.price / 9
    default:
      return 0
  }
}

export const bestRating = (beds) => beds.sort((a, b) => b.rating - a.rating)[0]