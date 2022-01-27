import { emblems, workHours } from './constants'

const higherSalary = (w1, w2) => w2.workingReward / w2.workingHours - w1.workingReward / w1.workingHours

export const traceStrategy = (workers, houses) => {
  /* workers = workers.sort(higherSalary)

  const housesEmblems = houses.slice(1).map((house) => house.emblem)
  console.log('housesEmblems', housesEmblems)

  const housesWithEmblem = housesEmblems.filter((emblem) => emblem !== emblems.noEmblem)
  console.log('housesWithEmblem', housesWithEmblem)

  const workersByEmblems = housesEmblems.map((houseEmblem) =>
    workers.filter((worker) => {
      const hasEmblem = worker.emblem === houseEmblem
      const hasWorkerEmblem = housesWithEmblem.includes(worker.emblem)
      return hasEmblem || (houseEmblem === emblems.noEmblem && !hasWorkerEmblem)
    }),
  )
  console.log('workersByEmblems', workersByEmblems)

  const bedsByEmblems = workersByEmblems.map((houseEmblem) => {
    const beds = []
    workHours.forEach((workHour) => {
      const worker = houseEmblem.find((worker) => worker.workingHours === workHour)
    })
  })
  console.log('bedsByEmblems', bedsByEmblems) */

  const strategy = { coinsPerDay: 0 }
  console.log('-----------------------')
  return strategy
}
