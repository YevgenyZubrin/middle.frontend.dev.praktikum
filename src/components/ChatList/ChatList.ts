import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { Chat } from '../../components/Chat'

export default class ChatList extends Block {
  constructor(props) {
    const chatList = getComponentsList(
      props.chatList,
      Chat,
    )

    super({
      ...props,
      chatListKeys: Object.keys(chatList),
      ...chatList,
    })
  }

  render() {
    return `
      <ul class="chats__list">
        ${this.props.chatListKeys.map((key) => `{{{ ${key} }}}`).join('')}
      </ul>  
    `
  }
}
