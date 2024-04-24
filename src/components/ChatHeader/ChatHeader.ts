import Block from '../../core/Block'
import { ChatImage } from '../ChatImage'
import { IconButton } from '../IconButton'
import { MenuIcon } from '../Icons'
import { Typography } from '../Typography'
import { UserActionsMenu } from '../UserActionsMenu'

export default class ChatHeader extends Block {
  constructor(props) {
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
      UserActionsMenu: new UserActionsMenu({ ...props }),
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
