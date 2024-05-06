import { Button, Modal } from '../../components'
import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { Chat } from '../../components/Chat'
import { Input } from '../../components/Input'
import { ChatHeader } from '../../components/ChatHeader'
import { ChatFooter } from '../../components/ChatFooter'
import { AddOrDeleteUser } from '../../components/AddOrDeleteUser'
import { Messages } from '../../components/Messages'
import chatList, { IChatList } from '../../public/constants/chatList'
import Router from '../../core/Router'

interface ChatsPageProps {
  isSomeChatChoosed: boolean
  chatsKeys: string[]
  ProfileButton: Button
  AddChatButton: Button
  SearchInput: Input
  ChatHeader: ChatHeader
  ChatFooter: ChatFooter
  AddUserModal: Modal
  RemoveUserModal: Modal
  Messages: Messages
}

export default class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    const chats = getComponentsList<IChatList>(chatList, Chat, {
      onClick: () => {
        // this.setProps({ isSomeChatChoosed: true })
      },
    })

    const choosedChat = chatList.find((item) => item.choosed)
    const chatsKeys = Object.keys(chats)
    super({
      ...props,
      chatsKeys,
      ProfileButton: new Button({
        text: 'Профиль',
        className: 'chats__profile-button',
        onClick: () => {
          Router.getInstance('#app').go('/profile')
        },
      }),
      AddChatButton: new Button({
        text: 'Добавить чат',
        className: 'chats__add-chat-button',
        filled: true,
        onClick: () => {},
      }),
      SearchInput: new Input({
        id: 'search',
        className: 'chats__search-field',
        placeholder: 'Поиск',
        type: 'text',
      }),
      ChatHeader: new ChatHeader({
        imgUrl: choosedChat?.imgUrl ?? '',
        nickname: choosedChat?.nickname ?? '',
        onAddUserModalOpen: () => {
          this.children.AddUserModal.setProps({ isOpen: true })
        },
        onRemoveUserModalOpen: () => {
          this.children.RemoveUserModal.setProps({ isOpen: true })
        },
        ...props,
      }),
      ChatFooter: new ChatFooter({}),
      AddUserModal: new Modal({
        className: 'chats__user-action-modal',
        isOpen: false,
        modalChildren: new AddOrDeleteUser({ isAddUser: true }),
      }),
      RemoveUserModal: new Modal({
        className: 'chats__user-action-modal',
        isOpen: false,
        modalChildren: new AddOrDeleteUser({ isAddUser: false }),
      }),
      Messages: new Messages({ messages: choosedChat?.messages ?? [] }),
      ...chats,
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
          <div class='chats__add-chat'>
          {{{ AddChatButton }}}
          </div>
          <ul class="chats__list">
            ${(this.props.chatsKeys as string[]).map((key) => `{{{ ${key} }}}`).join('')}
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

        {{{ AddUserModal }}}
        {{{ RemoveUserModal }}}

      </section>
    `
  }
}
