import Block from '../../core/Block'
import { connect, getImageUrl } from '../../utils'
import { ChatImage } from '../ChatImage'
import { IconButton } from '../IconButton'
import { MenuIcon } from '../Icons'
import { Typography } from '../Typography'
import { UserActionsMenu } from '../UserActionsMenu'
import { ChatHeaderProps } from './interfaces'

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps) {
    super({
      ...props,
      ChatImage: new ChatImage({
        imgUrl: props.imgUrl,
        className: 'chat-header__image',
      }),
      ChatName: new Typography({ text: props.activeChat?.title }),
      MenuButton: new IconButton({
        icon: new MenuIcon({}),
        className: 'chat-header__menu',
        onClick: () => {
          this.props.setIsUserActionMenuOpen(true)
        },
      }),
      UserActionsMenu: new UserActionsMenu({}),
    })
  }

  componentDidUpdate(oldProps: Partial<ChatHeaderProps>, newProps: Partial<ChatHeaderProps>): boolean {
    if (oldProps.activeChat?.title !== newProps.activeChat?.title) {
      this.children.ChatName.setProps({ text: newProps.activeChat?.title })
    }
    if (oldProps.activeChat?.avatar !== newProps.activeChat?.avatar) {
      this.children.ChatImage.setProps({ text: getImageUrl(newProps.activeChat?.avatar ?? '') })
    }
    return true
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

export default connect(({ activeChat, isUserActionMenuOpen }) => ({ activeChat, isUserActionMenuOpen }), {
  setIsUserActionMenuOpen: (dispatch, value) => dispatch({ isUserActionMenuOpen: value }),
})(ChatHeader)
