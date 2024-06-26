import { Button, Modal } from '..'
import Block from '../../core/Block'
import { connect, getValidationResult, isEmptyObjValues } from '../../utils'
import { Input } from '../Input'
import { ChatFooter } from '../ChatFooter'
import { AddOrDeleteUser } from '../AddOrDeleteUser'
import { MessagesBlock } from '../MessagesBlock'
import Router from '../../core/Router'
import { CreateChat } from '../CreateChat'
import { addUserToChat, changeChatAvatar, createChat, deleteUserFromChat, getChatToken } from '../../controller/chats'
import WSTransport from '../../core/WSTransport'
import { ChatHeader } from '../ChatHeader'
import { ChatsProps } from './interfaces'
import { AddOrDeleteUserFormType } from '../../core/types'
import { ChangeAvatarModal } from '../ChangeAvatarModal'

class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super({
      ...props,
      ProfileButton: new Button({
        text: 'Профиль',
        className: 'chats__profile-button',
        onClick: () => {
          Router.getInstance('#app').go('/settings')
        },
      }),
      AddChatButton: new Button({
        text: 'Добавить чат',
        className: 'chats__add-chat-button',
        filled: true,
        onClick: () => {
          this.props.setIsCreateChatModalOpen(true)
        },
      }),
      SearchInput: new Input({
        id: 'search',
        className: 'chats__search-field',
        placeholder: 'Поиск',
        type: 'text',
      }),
      ChatHeader: new ChatHeader({
        ...props,
      }),
      ChatFooter: new ChatFooter({}),
      CreateChatModal: new Modal({
        className: 'chats__create-chat-modal',
        isOpen: false,
        modalChildren: new CreateChat({
          onSubmit: (e: Event) => {
            e.preventDefault()
            createChat(this.props.newChatName)
            this.props.setIsCreateChatModalOpen(false)
            this.props.setNewChatName('')
          },
        }),
        closeModal: (e: Event) => {
          if (e.target instanceof HTMLElement && e.target?.classList.value.match('modal__overlay')) {
            this.props.setIsCreateChatModalOpen(false)
          }
        },
      }),
      AddUserModal: new Modal({
        className: 'chats__user-action-modal',
        isOpen: props.isAddUserToChatModalOpen,
        modalChildren: new AddOrDeleteUser({
          onSubmit: (e: Event) => {
            this.onSubmitValidation(e, this.props.addOrDeleteUserForm, 'addOrDeleteUserForm', 'add')
          },
          isAddUser: true,
        }),
        closeModal: (e: Event) => {
          if (e.target instanceof HTMLElement && e.target?.classList.value.match('modal__overlay')) {
            this.props.openCloseAddUserModal(false)
          }
        },
      }),
      RemoveUserModal: new Modal({
        className: 'chats__user-action-modal',
        isOpen: props.isDeleteUserToChatModalOpen,
        modalChildren: new AddOrDeleteUser({
          onSubmit: (e: Event) => {
            this.onSubmitValidation(e, this.props.addOrDeleteUserForm, 'addOrDeleteUserForm', 'delete')
          },
          isAddUser: false,
        }),
        closeModal: (e: Event) => {
          if (e.target instanceof HTMLElement && e.target?.classList.value.match('modal__overlay')) {
            this.props.openCloseDeleteUserModal(false)
          }
        },
      }),
      MessagesBlock: new MessagesBlock({ messages: [] }),
      Modal: new Modal({
        isOpen: false,
        closeModal: (e: Event) => {
          if (e.target instanceof HTMLElement && e.target?.classList.value.match('modal__overlay')) {
            this.children.Modal.setProps({ isOpen: false })
          }
        },
        modalChildren: new ChangeAvatarModal({
          choosedFileName: '',
          isFileLoadError: false,
          onSubmit: (e: Event) => {
            e.preventDefault()
            if (this.props.avatarFileName && e.target instanceof HTMLFormElement) {
              const formData = new FormData(e.target)
              formData.append('chatId', this.props.activeChat.id)
              changeChatAvatar(formData)
              e.target.reset()
            } else {
              this.props.setIsChooseFileErrore(true)
            }
          },
        }),
        className: 'profile__modal',
      }),
    })
  }

  onSubmitValidation(
    e: Event,
    form: AddOrDeleteUserFormType,
    formName: 'addOrDeleteUserForm',
    action: 'add' | 'delete',
  ) {
    e.preventDefault()

    const validationResult = getValidationResult(form.values)

    if (isEmptyObjValues(validationResult)) {
      if (action === 'add') {
        addUserToChat(this.props.activeChat.id, form.values.login)
      } else {
        deleteUserFromChat(this.props.activeChat.id, form.values.login)
      }

      this.props.openCloseAddUserModal(false)
      this.props.openCloseDeleteUserModal(false)
    } else {
      this.props.setForm(
        {
          errors: { ...form.errors, ...validationResult },
          values: { ...form.values },
        },
        formName,
      )
    }
  }

  async openNewWSConnetcion(chatId: number) {
    const chatToken = await getChatToken(chatId)
    WSTransport.openConnection(this.props.user.values.id, chatId, chatToken)
  }

  componentDidUpdate(oldProps: AnyProps, newProps: AnyProps): boolean {
    if (oldProps.isCreateChatModalOpen !== newProps.isCreateChatModalOpen) {
      this.children.CreateChatModal.setProps({ isOpen: newProps.isCreateChatModalOpen })
    }
    if (oldProps.isAddUserToChatModalOpen !== newProps.isAddUserToChatModalOpen) {
      this.children.AddUserModal.setProps({ isOpen: newProps.isAddUserToChatModalOpen })
    }
    if (oldProps.isDeleteUserToChatModalOpen !== newProps.isDeleteUserToChatModalOpen) {
      this.children.RemoveUserModal.setProps({ isOpen: newProps.isDeleteUserToChatModalOpen })
    }
    if (oldProps?.activeChat !== newProps.activeChat) {
      this.openNewWSConnetcion(newProps.activeChat.id)
    }
    if (oldProps.isChangeChatAvatarModalOpen !== newProps.isChangeChatAvatarModalOpen) {
      this.children.Modal.setProps({ isOpen: true })
    }
    return true
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
            {{{ chatList }}}
          </ul>  
        </section>
        <section class="chats__right-side right-side">
        
          {{#if activeChat}}
            <div class="right-side__wrapper">
              {{{ ChatHeader }}}

              <div class='right-side__messages'>
                {{{ MessagesBlock }}}
              </div>

              {{{ ChatFooter }}}
            </div>
          {{else}}
            Выберите чат чтобы отправить сообщение
          {{/if}}

        </section>

        {{{ AddUserModal }}}
        {{{ RemoveUserModal }}}
        {{{ CreateChatModal }}}

        {{{ Modal }}}

      </section>
    `
  }
}

export default connect(
  ({
    user,
    chatToken,
    isCreateChatModalOpen,
    newChatName,
    activeChat,
    addOrDeleteUserForm,
    isAddUserToChatModalOpen,
    isDeleteUserToChatModalOpen,
    messages,
    isChangeChatAvatarModalOpen,
    isChooseFileError,
    avatarFileName,
  }) => ({
    user,
    chatToken,
    isCreateChatModalOpen,
    newChatName,
    activeChat,
    addOrDeleteUserForm,
    isAddUserToChatModalOpen,
    isDeleteUserToChatModalOpen,
    messages,
    isChangeChatAvatarModalOpen,
    isChooseFileError,
    avatarFileName,
  }),
  {
    setIsCreateChatModalOpen: (dispatch, value) => dispatch({ isCreateChatModalOpen: value }),
    setNewChatName: (dispatch, value) => dispatch({ newChatName: value }),
    openCloseAddUserModal: (dispatch, value) => dispatch({ isAddUserToChatModalOpen: value }),
    openCloseDeleteUserModal: (dispatch, value) => dispatch({ isDeleteUserToChatModalOpen: value }),
    setChatToken: (dispatch, value) => dispatch({ chatToken: value }),
    setMessages: (dispatch, value) => dispatch({ messages: value }),
    setIsChooseFileErrore: (dispatch, value) => dispatch({ isChooseFileError: value }),
  },
)(Chats)
