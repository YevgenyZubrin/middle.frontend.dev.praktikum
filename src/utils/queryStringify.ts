const queryStringify = (data: AnyProps): string | never => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object')
  }

  const encode = (value: any) => encodeURIComponent(value)

  function buildQueryString(obj: AnyProps, prefix?: string): string {
    return Object.keys(obj)
      .map((key) => {
        const fullKey = prefix ? `${prefix}[${encode(key)}]` : encode(key)
        const value = obj[key]

        if (typeof value === 'object' && value !== null) {
          return buildQueryString(value, fullKey)
        }
        if (Array.isArray(value)) {
          return value.map((val, index) => `${fullKey}[${index}]=${encode(val)}`).join('&')
        }
        return `${fullKey}=${encode(value)}`
      })
      .join('&')
  }

  return buildQueryString(data)
}

export default queryStringify
