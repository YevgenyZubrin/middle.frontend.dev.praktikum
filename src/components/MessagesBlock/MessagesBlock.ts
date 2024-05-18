import Block from '../../core/Block'
import { IMessages } from '../../core/types'
import { connect, isEqual } from '../../utils'
import { Message } from '../Message'
import { MessagesPerDay } from '../MessagesPerDay'
import { MessagesBlockProps } from './interfaces'

class MessagesBlock extends Block<MessagesBlockProps> {
  constructor(props: MessagesBlockProps) {
    super({
      ...props,
    })
  }

  init(): void {
    const MessageList = new MessagesPerDay({
      messageList: this.mapChatToComponent(this.props.messages) || [],
    })
    this.children = { MessageList }
  }

  mapChatToComponent(messages: IMessages[]) {
    return messages?.map(
      (message) =>
        new Message({
          ...message,
        }),
    )
  }

  componentDidUpdate(oldProps: AnyProps, newProps: AnyProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.MessageList.setProps({
        messageList: this.mapChatToComponent(newProps.messages) || [],
      })
    }
    return true
  }

  render() {
    return `
      <div>
        {{{ MessageList }}}
      </div>
    `
  }
}

export default connect(({ messages }) => ({ messages }))(MessagesBlock)
