import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { CrossIcon, PlusIcon } from '../Icons'
import { IconButton } from '../IconButton'

interface UserActionsMenuProps {
  onAddUserModalOpen?: () => void
  onRemoveUserModalOpen?: () => void
  actionListKey?: string[]
}

interface UserActionList {
  text: string
  icon: PlusIcon | CrossIcon
  className: string
  onClick?: () => void
}

export default class UserActionsMenu extends Block<UserActionsMenuProps> {
  constructor(props: UserActionsMenuProps) {
    const userActionList: UserActionList[] = [
      {
        text: 'Добавить пользователя',
        icon: new PlusIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          if (props.onAddUserModalOpen) {
            props.onAddUserModalOpen()
          }
        },
      },
      {
        text: 'Удалить пользователя',
        icon: new CrossIcon({}),
        className: 'user-actions-menu__button',
        onClick: () => {
          if (props.onRemoveUserModalOpen) {
            props.onRemoveUserModalOpen()
          }
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
