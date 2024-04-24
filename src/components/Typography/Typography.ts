import Block from '../../core/Block'

export default class Typography extends Block {
  constructor(props) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <p class="typography {{className}}">{{text}}</p>
    `
  }
}
