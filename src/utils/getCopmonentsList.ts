import Block from '../core/Block'

const getComponentsList = <L>(list: L[], Component: new (...args: any[]) => Block, props: Record<string, any> = {}) => {
  const fieldsComponents = list.reduce<Record<string, Block<Record<string, any>>>>((acc, data) => {
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
