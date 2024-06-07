const flat = (array: unknown[]) => {
  const tempArr: unknown[] = []
  array.forEach((item) => {
    if (Array.isArray(item)) {
      tempArr.push(...flat(item))
    } else {
      tempArr.push(item)
    }
  })

  return tempArr
}

export default flat
