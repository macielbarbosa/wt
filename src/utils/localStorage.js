class localStorage {
  getItem(name) {
    return JSON.parse(window.localStorage.getItem(name))
  }

  setItem(name, value) {
    return window.localStorage.setItem(name, JSON.stringify(value))
  }

  upsertItem(name, value) {
    const item = this.getItem(name)
    if (!item) {
      this.setItem(name, value)
      return value
    } else return item
  }
}

export default new localStorage()
