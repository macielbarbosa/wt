export const getNextArrayItem = (array, value) => {
  const indexOf = array.indexOf(value)
  return indexOf === array.length - 1 ? array[0] : array[indexOf + 1]
}
