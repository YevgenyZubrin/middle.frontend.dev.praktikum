const isEmptyObjValues = (obj: AnyProps): boolean => Object.values(obj).every((item) => !item)

export default isEmptyObjValues
