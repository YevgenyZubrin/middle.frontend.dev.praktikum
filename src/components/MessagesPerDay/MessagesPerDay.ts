import Block from '../../core/Block'
import { connect, getDate } from '../../utils'
import { Typography } from '../Typography'
import { MessagesPerDayProps } from './interfaces'

class MessagesPerDay extends Block<MessagesPerDayProps> {
  constructor(props: MessagesPerDayProps) {
    super({
      ...props,
      Date: new Typography({
        text: getDate(new Date()),
        className: 'messages-per-day__date',
      }),
    })
  }

  render() {
    const shouldRenderDate = this.props.messages.length > 0

    return `
      <div class="messages-per-day">
        {{#if ${shouldRenderDate}}}
          {{{ Date }}}
        {{/if}}

        <div class="messages-per-day__messages-wrapper">
          {{{ messageList }}}
        </div>
      </div>
    `
  }
}

export default connect(({ messages }) => ({ messages }))(MessagesPerDay)
