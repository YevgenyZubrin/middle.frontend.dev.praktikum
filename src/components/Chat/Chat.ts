import Block from '../../core/Block'
import { ChatImage } from '../ChatImage'

interface ChatProps {
  nickname: string
  lastMessage: string
  lastMessageTime: string
  unreadMessages?: number
  className?: string
  choosed?: boolean
  onClick?: () => void
  ChatImage: ChatImage
  events: { click: () => void }
  imgUrl?: string
}

export default class Chat extends Block<ChatProps> {
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
    return `
      <li class="item{{#if choosed}} item_choosed {{/if}}{{className}}">
        <div class="item__column_first">
          {{{ ChatImage }}}
        </div>
        <div class="item__column item__column-second">
          <p class="item__name">{{nickname}}</p>
          <p class="item__last-message">{{lastMessage}}</p>
        </div>
        <div class="item__column_third">
          <p class="item__time">{{lastMessageTime}}</p>
          {{#if unreadMessages}}
            <div class="item__amount-wrapper">
              <p class="item__message-amount">{{unreadMessages}}</p>
            </div>
          {{/if}}
        </div>
      </li>
    `
  }
}
