import Block from '../../core/Block'
import { IMessages } from '../../public/constants/chatList'
import getComponentsList from '../../utils/getCopmonentsList'
import { MessagesPerDay } from '../MessagesPerDay'

interface MessagesProps {
  messages: IMessages[]
  messagesListKeys?: string[]
}

export default class Messages extends Block<MessagesProps> {
  constructor(props: MessagesProps) {
    const messagesList = getComponentsList<IMessages>(props.messages, MessagesPerDay)

    super({
      ...props,
      messagesListKeys: Object.keys(messagesList),
      ...messagesList,
    })
  }

  render() {
    return `
      <div>
        ${(this.props.messagesListKeys as string[]).map((key) => `{{{ ${key} }}}`).join('')}
      </div>
    `
  }
}
