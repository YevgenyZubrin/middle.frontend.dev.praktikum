import Block from '../../core/Block'
import { IconButton } from '../IconButton'
import { SendMessageIcon } from '../Icons'
import { Input } from '../Input'
import { FormMessageProps } from './interfaces'

class FormMessage extends Block<FormMessageProps> {
  constructor(props: FormMessageProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
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
    })
  }

  render() {
    return `
      <form class='message-form'>
        {{{ MessageInput }}}
          
        {{{ SendMessageButton }}}
      </form>
    `
  }
}

export default FormMessage
