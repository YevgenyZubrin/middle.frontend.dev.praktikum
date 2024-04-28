const getName = (children: Record<string, any>, fieldName: string): string =>
  Object.entries(children)
    .map(([name, component]) => ({ name, props: component.props }))
    .find((item) => item.props.id === fieldName)?.name ?? ''
export default getName
