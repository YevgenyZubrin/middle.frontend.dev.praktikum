type Indexed<T = unknown> = {
  [key: string]: T
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  if (typeof object !== 'object' || object === null) {
    return object
  }

  const result: Indexed = object as Indexed
  const keys = path.split('.')
  let current = result

  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    }
    current = current[key] as Indexed
  }

  current[keys[keys.length - 1]] = value

  return result
}

export default set
