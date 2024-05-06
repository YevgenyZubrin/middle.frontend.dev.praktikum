import Block from '../../core/Block'
import { IMessagesPerDay } from '../../public/constants/chatList'
import { getComponentsList } from '../../utils'
import { Message } from '../Message'
import { Typography } from '../Typography'

interface MessagesPerDayProps {
  Date: Typography
  messagesPerDayKeys: string[]
  date: string
  messagesPerDay: IMessagesPerDay[]
}

export default class MessagesPerDay extends Block<MessagesPerDayProps> {
  constructor(props: MessagesPerDayProps) {
    const messagesPerDay = getComponentsList<IMessagesPerDay>(props.messagesPerDay, Message)

    super({
      ...props,
      Date: new Typography({
        text: props.date,
        className: 'messages-per-day__date',
      }),
      messagesPerDayKeys: Object.keys(messagesPerDay),
      ...messagesPerDay,
    })
  }

  render() {
    return `
      <div class="messages-per-day">
        {{{ Date }}}

        <div class="messages-per-day__messages-wrapper">
          ${(this.props.messagesPerDayKeys as string[]).map((key) => `{{{ ${key} }}}`).join('')}
        </div>
      </div>
    `
  }
}
