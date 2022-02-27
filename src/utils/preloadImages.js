import { ASSETS_URL, enumEmblems } from './constants'
import { houseMetadata } from './houseMetadata'
import { workerMetadata } from './workerMetadata'

const load = (src) => {
  const image = new Image()
  image.src = ASSETS_URL + src
}

export const preloadImages = () => {
  Object.values(houseMetadata).forEach(({ image }) => {
    load(image)
  })
  Object.values(workerMetadata).forEach(({ image }) => {
    load(image.replace('gender', 'male'))
    if (image.includes('gender')) {
      load(image.replace('gender', 'female'))
    }
  })
  Object.values(enumEmblems).forEach((emblem) => {
    if (emblem === enumEmblems.noEmblem) return
    load(`houses/emblems/${emblem.toLowerCase()}.png`)
  })
}
