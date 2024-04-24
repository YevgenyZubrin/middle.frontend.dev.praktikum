import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { Message } from '../Message'
import { Typography } from '../Typography'

export default class MessagesPerDay extends Block {
  constructor(props) {
    const messagesPerDay = getComponentsList(
      props.messagesPerDay,
      Message,
    )

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
          ${this.props.messagesPerDayKeys.map((key) => `{{{ ${key} }}}`).join('')}
        </div>
      </div>
    `
  }
}
