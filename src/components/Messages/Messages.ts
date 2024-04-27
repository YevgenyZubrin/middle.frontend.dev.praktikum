import Block from '../../core/Block'
import getComponentsList from '../../utils/getCopmonentsList'
import { MessagesPerDay } from '../MessagesPerDay'

export default class Messages extends Block {
  constructor(props) {
    const messages = getComponentsList(
      props.messages,
      MessagesPerDay,
    )

    super({
      ...props,
      messagesKeys: Object.keys(messages),
      ...messages,
    })
  }

  render() {
    return `
      <div>
        ${this.props.messagesKeys.map((key) => `{{{ ${key} }}}`).join('')}
      </div>
    `
  }
}
