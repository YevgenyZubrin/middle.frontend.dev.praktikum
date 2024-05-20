import Block from '../../core/Block'
import { connect } from '../../utils'
import { ChatImage } from '../ChatImage'
import { ChatProps } from './interfaces'

class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({
      ...props,
      ChatImage: new ChatImage({ ...props }),
      events: {
        click: props.onClick || (() => {}),
      },
    })
  }

  render() {
    const choosed = this.props.activeChat?.id === this.props?.id

    return `
      <li class="item{{#if ${choosed}}} item_choosed {{/if}}{{className}}">
        <div class="item__column_first">
          {{{ ChatImage }}}
        </div>
        <div class="item__column item__column-second">
          <p class="item__name">{{title}}</p>
          <p class="item__last-message">{{last_message.content}}</p>
        </div>
        <div class="item__column_third">
          {{#if unread_count}}
            <div class="item__amount-wrapper">
              <p class="item__message-amount">{{unread_count}}</p>
            </div>
          {{/if}}
        </div>
      </li>
    `
  }
}

export default connect(({ activeChat }) => ({ activeChat }))(Chat)
