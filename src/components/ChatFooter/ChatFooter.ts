import Block from '../../core/Block'
import WSTransport from '../../core/WSTransport'
import { FileTypeMenu } from '../FileTypeMenu'
import { FormMessage } from '../FormMessage'
import { IconButton } from '../IconButton'
import { ShareFileIcon } from '../Icons'
import { ChatFooterProps } from './interfaces'

class ChatFooter extends Block<ChatFooterProps> {
  constructor(props: ChatFooterProps) {
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
        onSubmit: (e: Event) => {
          e.preventDefault()
          if (e.target && e.target instanceof HTMLFormElement) {
            const formValue = Object.fromEntries(new FormData(e.target))
            if (formValue.message) {
              WSTransport.sendMessage(formValue.message as string)
              e.target.reset()
            }
          }
        },
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

export default ChatFooter
