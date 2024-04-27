import Block from '../../core/Block'
import { IconButton } from '../IconButton'
import { SendMessageIcon } from '../Icons'
import { Input } from '../Input'

export default class FormMessage extends Block {
  constructor(props) {
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
        onBlur: (e) => {
          if (!e.target.value) {
            console.log('не должно быть пустым')
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
