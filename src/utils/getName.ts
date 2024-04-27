const getName = (children, fieldName) => Object.entries(children)
  .map(([name, component]) => ({ name, props: component.props }))
  .find((item) => item.props.id === fieldName)?.name

export default getName
