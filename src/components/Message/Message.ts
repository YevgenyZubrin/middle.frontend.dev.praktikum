import Block from '../../core/Block'

interface MessageProps {
  type: string
  text: string
}
export default class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
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
