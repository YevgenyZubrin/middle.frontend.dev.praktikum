import Block from '../../core/Block'
import { getValidationResult } from '../../utils'
import { FileTypeMenu } from '../FileTypeMenu'
import { FormMessage } from '../FormMessage'
import { IconButton } from '../IconButton'
import { ShareFileIcon } from '../Icons'

interface ChatFooterProps {
  isShareMenuOpened?: boolean
  ShareFileButton?: IconButton
  FileTypeMenu?: FileTypeMenu
  FormMessage?: FormMessage
}

export default class ChatFooter extends Block<ChatFooterProps> {
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
          if (e.target) {
            // eslint-disable-next-line no-console
            console.log(getValidationResult(e.target))
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
