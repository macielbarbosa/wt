import { ASSETS_URL } from './constants'

export const getWorkerImage = (worker) => ASSETS_URL + worker.image.replace('gender', worker.gender.toLowerCase())
