function cloneDeep<T extends object = object>(obj: T) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    const arrCopy = [] as unknown as T
    for (let i = 0; i < obj.length; i += 1) {
      ;(arrCopy as unknown as any[])[i] = cloneDeep(obj[i])
    }
    return arrCopy
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }

  const copiedObj = {} as T
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      ;(copiedObj as any)[key] = cloneDeep((obj as any)[key])
    }
  }
  return copiedObj
}

export default cloneDeep
