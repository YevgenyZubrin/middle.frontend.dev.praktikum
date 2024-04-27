import Block from '../../core/Block'
import { formSubmit } from '../../utils'
import { FileTypeMenu } from '../FileTypeMenu'
import { FormMessage } from '../FormMessage'
import { IconButton } from '../IconButton'
import { ShareFileIcon } from '../Icons'

export default class ChatFooter extends Block {
  constructor(props) {
    super({
      ...props,
      ShareFileButton: new IconButton({
        icon: new ShareFileIcon({}),
        className: 'chat-footer__share-button',
        onClick: () => {
          this.setProps({ isShareMenuOpened: !this.props.isShareMenuOpened })
        },
      }),
      FileTypeMenu: new FileTypeMenu({}),
      FormMessage: new FormMessage({
        onSubmit: formSubmit,
      }),
    })
  }

  render() {
    return `
      <div class='chat-footer'>
        {{{ ShareFileButton }}}

        {{{ FormMessage }}}

        {{#if isShareMenuOpened}}
          {{{ FileTypeMenu }}}
        {{/if}}
      </div>
    `
  }
}
