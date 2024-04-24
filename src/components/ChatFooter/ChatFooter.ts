import Block from '../../core/Block'
import { FileTypeMenu } from '../FileTypeMenu'
import { IconButton } from '../IconButton'
import { SendMessageIcon, ShareFileIcon } from '../Icons'
import { Input } from '../Input'

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
      SendMessageButton: new IconButton({
        icon: new SendMessageIcon({}),
        className: 'chat-footer__send-button',
      }),
      MessageInput: new Input({
        id: 'message',
        className: 'chat-footer__message-field',
        placeholder: 'Сообщение',
        type: 'text',
      }),
      FileTypeMenu: new FileTypeMenu({}),
    })
  }

  render() {
    return `
      <div class='chat-footer'>
        {{{ ShareFileButton }}}

        <form class='chat-footer__message-form'>
          {{{ MessageInput }}}
          
          {{{ SendMessageButton }}}
        </form>

        {{#if isShareMenuOpened}}
          {{{ FileTypeMenu }}}
        {{/if}}
      </div>
    `
  }
}
