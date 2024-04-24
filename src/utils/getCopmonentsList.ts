const getComponentsList = (list, component, props = {}) => {
  console.log(list)
  const fieldsComponents = list.reduce((acc, data) => {
    if (component instanceof Object) {
      const element = new component({
        ...data,
        ...props,
      })
      acc[element._id] = element
      return acc
    }
  }, {})

  return fieldsComponents
}

export default getComponentsList
