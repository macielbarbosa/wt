export class Lobby {
  constructor(workers, emblem) {
    this.workers = workers
    this.emblem = emblem
  }

  next(workingHours = false) {
    if (workingHours) {
      const index = this.workers.findIndex((worker) => worker.workingHours === workingHours)
      return this.workers.splice(index, 1)
    }
    return this.workers.pop()
  }
}
