const getComponentsList = (list, Component, props = {}) => {
  const fieldsComponents = list.reduce((acc, data) => {
    if (Component instanceof Object) {
      const element = new Component({
        ...data,
        ...props,
      })
      acc[element._id] = element
      return acc
    }
    return acc
  }, {})

  return fieldsComponents
}

export default getComponentsList
