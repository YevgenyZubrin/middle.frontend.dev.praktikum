import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import {
  CrossIcon, PlusIcon,
} from '../Icons'
import { IconButton } from '../IconButton'

export default class UserActionsMenu extends Block {
  constructor(props) {
    const userActionList = [
      {
        text: 'Добавить пользователя',
        icon: new PlusIcon({}),
        className: 'user-actions-menu__button',
      },
      {
        text: 'Удалить пользователя',
        icon: new CrossIcon({}),
        className: 'user-actions-menu__button',
      },
    ]

    const actionList = getComponentsList(
      userActionList,
      IconButton,
    )

    super({
      ...props,
      actionListKey: Object.keys(actionList),
      ...actionList,
    })
  }

  render() {
    return `
      <div class="user-actions-menu__list">
        ${this.props.actionListKey.map((key) => `{{{ ${key} }}}`).join('')}
      </div>  
    `
  }
}
