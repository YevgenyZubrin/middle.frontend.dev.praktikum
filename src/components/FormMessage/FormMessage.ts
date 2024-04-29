import Block from '../../core/Block'
import { validate } from '../../utils'
import { IconButton } from '../IconButton'
import { SendMessageIcon } from '../Icons'
import { Input } from '../Input'

interface FormMessageProps {
  events?: { submit: (e: Event) => void }
  onSubmit?: (e: Event) => void
  SendMessageButton?: IconButton
  MessageInput?: Input
}

export default class FormMessage extends Block<FormMessageProps> {
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
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            // eslint-disable-next-line no-console
            console.log(validate('message', e.target.value))
          }
        },
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
