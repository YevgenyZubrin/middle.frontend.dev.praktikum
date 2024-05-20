const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null && !Array.isArray(value)

export default isObject
