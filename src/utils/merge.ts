import isObject from './isObject'

type Indexed<T = unknown> = {
  [key in string]: T
}

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const result: Indexed = { ...lhs }

  for (const key in rhs) {
    if (rhs.hasOwnProperty(key)) {
      const rhsValue = rhs[key]
      const lhsValue = lhs[key]

      if (isObject(rhsValue) && isObject(lhsValue)) {
        result[key] = merge(lhsValue as Indexed, rhsValue as Indexed)
      } else {
        result[key] = rhsValue
      }
    }
  }

  return result
}

export default merge
