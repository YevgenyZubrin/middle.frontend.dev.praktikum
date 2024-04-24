import Block from '../../core/Block'

export default class Message extends Block {
  constructor(props) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <div class="message {{type}}">
        {{text}}
      </div>
    `
  }
}
