import Block from '../../core/Block'
import { connect, getComponentsList } from '../../utils'
import { CrossIcon, PlusIcon } from '../Icons'
import { IconButton } from '../IconButton'

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
        text: 'Добавить пользователя',
        icon: new PlusIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          this.props.openCloseAddUserModal(true)
          this.props.setIsUserActionMenuOpen(false)
        },
      },
      {
        text: 'Удалить пользователя',
        icon: new CrossIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          this.props.openCloseDeleteUserModal(true)
          this.props.setIsUserActionMenuOpen(false)
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
  ({ isAddUserToChatModalOpen, isDeleteUserToChatModalOpen, isUserActionMenuOpen }) => ({
    isAddUserToChatModalOpen,
    isDeleteUserToChatModalOpen,
    isUserActionMenuOpen,
  }),
  {
    openCloseAddUserModal: (dispatch, value) => dispatch({ isAddUserToChatModalOpen: value }),
    openCloseDeleteUserModal: (dispatch, value) => dispatch({ isDeleteUserToChatModalOpen: value }),
    setIsUserActionMenuOpen: (dispatch, value) => dispatch({ isUserActionMenuOpen: value }),
  },
)(UserActionsMenu)
