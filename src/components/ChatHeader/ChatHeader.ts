import Block from '../../core/Block'
import { ChatImage } from '../ChatImage'
import { IconButton } from '../IconButton'
import { MenuIcon } from '../Icons'
import { Typography } from '../Typography'
import { UserActionsMenu } from '../UserActionsMenu'

interface ChatHeaderProps {
  imgUrl: string
  nickname: string
  isUserActionMenuOpen?: boolean
  ChatImage?: ChatImage
  ChatName?: Typography
  MenuButton?: IconButton
  UserActionsMenu?: UserActionsMenu
  onAddUserModalOpen?: () => void
  onRemoveUserModalOpen?: () => void
}

export default class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      ChatImage: new ChatImage({
        imgUrl: props.imgUrl,
        className: 'chat-header__image',
      }),
      ChatName: new Typography({ text: props.nickname }),
      MenuButton: new IconButton({
        icon: new MenuIcon({}),
        className: 'chat-header__menu',
        onClick: () => {
          this.setProps({ isUserActionMenuOpen: !this.props.isUserActionMenuOpen })
        },
      }),
      UserActionsMenu: new UserActionsMenu({
        onAddUserModalOpen: props.onAddUserModalOpen,
        onRemoveUserModalOpen: props.onRemoveUserModalOpen,
      }),
    })
  }

  render() {
    return `
      <div class='chat-header'>
        <div class='chat-header__wrapper'>
          <div class='chat-header__name'>
            {{{ ChatImage }}}
            {{{ ChatName }}}
          </div>

          {{{ MenuButton }}}
        </div>

        {{#if isUserActionMenuOpen}}
          {{{ UserActionsMenu }}}
        {{/if}}
      </div>
    `
  }
}
