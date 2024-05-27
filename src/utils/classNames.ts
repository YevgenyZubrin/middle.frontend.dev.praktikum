import flat from './flat'
import isObject from './isObject'

const classNames = (...args: unknown[]): string => {
  const classNamesArr: (string | number)[] = []

  const useStringOrNumbers = (...args: unknown[]): void => {
    args.forEach((arg) => {
      if (arg && (typeof arg === 'string' || typeof arg === 'number')) {
        classNamesArr.push(arg)
      }
    })
  }

  args.forEach((arg) => {
    if (Array.isArray(arg)) {
      const flatedArg = flat(arg as unknown[])
      useStringOrNumbers(...flatedArg)
    } else if (isObject(arg)) {
      for (const key in arg as UnknownProps) {
        if ((arg as UnknownProps)[key]) {
          classNamesArr.push(key)
        }
      }
    } else {
      useStringOrNumbers(arg)
    }
  })

  return classNamesArr.join(' ')
}

export default classNames
