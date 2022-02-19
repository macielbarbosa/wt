import { ASSETS_URL } from './constants'

export const getWorkerImage = (worker) => ASSETS_URL + worker.image.replace('gender', worker.gender.toLowerCase())

export const isEqualWorkers = (worker1, worker2) =>
  worker2 && worker1.workerClass === worker2.workerClass && worker1.gender === worker2.gender
