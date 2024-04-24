import { Button, Modal } from '../../components'
import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { Chat } from '../../components/Chat'
import { Input } from '../../components/Input'
import { ChatHeader } from '../../components/ChatHeader'
import { ChatFooter } from '../../components/ChatFooter'
import { AddOrDeleteUser } from '../../components/AddOrDeleteUser'
import { Messages } from '../../components/Messages'

export default class ChatsPage extends Block {
  constructor(props) {
    const chatList = getComponentsList(props.chatList, Chat, {
      onClick: () => {
        this.setProps({ isSomeChatChoosed: true })
      },
    })

    const choosedChat = props.chatList.find((item) => item.choosed)

    super({
      ...props,
      ProfileButton: new Button({
        text: 'Профиль',
        className: 'chats__profile-button',
        onClick: () => {
          this.setProps({ isSomeChatChoosed: true })
        },
      }),
      SearchInput: new Input({
        id: 'search',
        className: 'chats__search-field',
        placeholder: 'Поиск',
        type: 'text',
      }),
      ChatHeader: new ChatHeader({
        ...choosedChat,
        ...props,
      }),
      ChatFooter: new ChatFooter({}),
      UserActionModal: new Modal({
        className: 'chats__user-action-modal',
        isOpen: false,
        modalChildren: new AddOrDeleteUser({ isAddUser: true }),
      }),
      Messages: new Messages({ messages: choosedChat.messages }),
      chatListKeys: Object.keys(chatList),
      ...chatList,
    })
  }

  render() {
    return `
      <section class="chats">
        <section class="chats__left-side">
          {{{ ProfileButton }}}
          <div class='chats__search'>
            {{{ SearchInput }}}
          </div>
          <ul class="chats__list">
            ${this.props.chatListKeys.map((key) => `{{{ ${key} }}}`).join('')}
          </ul>  
        </section>
        <section class="chats__right-side right-side">
        
          {{#if isSomeChatChoosed}}
            <div class="right-side__wrapper">
              {{{ ChatHeader }}}

              <div class='right-side__messages'>
                {{{ Messages }}}
              </div>

              {{{ ChatFooter }}}
            </div>
          {{else}}
            Выберите чат чтобы отправить сообщение
          {{/if}}

        </section>

        {{{ UserActionModal }}}

      </section>
    `
  }
}
