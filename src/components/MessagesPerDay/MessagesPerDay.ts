import Block from '../../core/Block'
import { connect } from '../../utils'
import { MessagesPerDayProps } from './interfaces'

class MessagesPerDay extends Block<MessagesPerDayProps> {
  constructor(props: MessagesPerDayProps) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <div class="messages-per-day">
        <div class="messages-per-day__messages-wrapper">
          {{{ messageList }}}
        </div>
      </div>
    `
  }
}

export default connect(({ messages }) => ({ messages }))(MessagesPerDay)
