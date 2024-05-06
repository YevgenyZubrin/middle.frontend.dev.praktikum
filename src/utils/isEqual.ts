const isEqual = (a: object, b: object): boolean => {
  function isObject(obj: any): boolean {
    return obj != null && typeof obj === 'object'
  }

  if (a === b) {
    return true
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = (a as any)[key]
    const valB = (b as any)[key]

    const areObjects = isObject(valA) && isObject(valB)
    if ((areObjects && !isEqual(valA, valB)) || (!areObjects && valA !== valB)) {
      return false
    }
  }

  return true
}

export default isEqual
