export const localStorage = {
  getItem: (name) => JSON.parse(window.localStorage.getItem(name)),
  setItem: (name, value) =>
    window.localStorage.setItem(name, JSON.stringify(value)),
};
