import Block from '../../Block'

export class TestComponent extends Block {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // componentDidUpdate(_oldProps: AnyProps, _newProps: AnyProps) {
  //   return true
  // }

  render() {
    return `
      <p>Hello test!</p>
    `
  }
}
