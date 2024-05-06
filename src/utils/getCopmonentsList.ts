import Block from '../core/Block'

const getComponentsList = <L>(list: L[], Component: new (...args: any[]) => Block, props: AnyProps = {}) => {
  const fieldsComponents = list.reduce((acc: Record<string, Block<AnyProps>>, data) => {
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
