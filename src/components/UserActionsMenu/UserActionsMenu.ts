import Block from '../../core/Block'
import { connect, getComponentsList } from '../../utils'
import { CrossIcon, MediaIcon, PlusIcon } from '../Icons'
import { IconButton } from '../IconButton'
import { deleteChat, getChatUsers } from '../../controller/chats'

interface UserActionList {
  text: string
  icon: PlusIcon | CrossIcon
  className: string
  onClick?: () => void
}

class UserActionsMenu extends Block {
  constructor(props = {}) {
    const userActionList: UserActionList[] = [
      {
        text: 'Изменить картинку чата',
        icon: new MediaIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          this.props.openCloseChangeChatAvatarModal(true)
          this.props.setIsChatActionMenuOpen(false)
        },
      },
      {
        text: 'Добавить пользователя',
        icon: new PlusIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          this.props.openCloseAddUserModal(true)
          this.props.setIsChatActionMenuOpen(false)
        },
      },
      {
        text: 'Удалить пользователя',
        icon: new CrossIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          getChatUsers(this.props.activeChat.id)
          this.props.openCloseDeleteUserModal(true)
          this.props.setIsChatActionMenuOpen(false)
        },
      },
      {
        text: 'Удалить чат',
        icon: new CrossIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          deleteChat(this.props.activeChat.id)
          this.props.setIsChatActionMenuOpen(false)
        },
      },
    ]

    const actionList = getComponentsList<UserActionList>(userActionList, IconButton)

    super({
      ...props,
      actionListKey: Object.keys(actionList),
      ...actionList,
    })
  }

  render() {
    return `
      <div class="user-actions-menu__list">
        ${(this.props.actionListKey as string[]).map((key) => `{{{ ${key} }}}`).join('')}
      </div>  
    `
  }
}

export default connect(
  ({
    isAddUserToChatModalOpen,
    isDeleteUserToChatModalOpen,
    isChatActionMenuOpen,
    isChangeChatAvatarModalOpen,
    activeChat,
  }) => ({
    isAddUserToChatModalOpen,
    isDeleteUserToChatModalOpen,
    isChatActionMenuOpen,
    isChangeChatAvatarModalOpen,
    activeChat,
  }),
  {
    openCloseAddUserModal: (dispatch, value) => dispatch({ isAddUserToChatModalOpen: value }),
    openCloseDeleteUserModal: (dispatch, value) => dispatch({ isDeleteUserToChatModalOpen: value }),
    setIsChatActionMenuOpen: (dispatch, value) => dispatch({ isChatActionMenuOpen: value }),
    openCloseChangeChatAvatarModal: (dispatch, value) => dispatch({ isChangeChatAvatarModalOpen: value }),
  },
)(UserActionsMenu)
