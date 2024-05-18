import Block from '../../core/Block'
import { connect } from '../../utils'
import { Button } from '../Button'
import { Typography } from '../Typography'
import CreateChatField from './CreateChatField'
import { CreateChatProps } from './interfaces'

class CreateChat extends Block<CreateChatProps> {
  constructor(props: CreateChatProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      Button: new Button({
        className: 'create-chat__button',
        text: 'Добавить',
        filled: true,
      }),
      ChatNameField: new CreateChatField({
        className: 'create-chat__input',
        labelText: 'Название чата',
        id: 'chatName',
        type: 'text',
        onChange: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.props.setNewChatName(e.target.value)
          }
        },
      }),
      Title: new Typography({
        className: 'create-chat__title',
        text: 'Добавить чат',
      }),
    })
  }

  render() {
    return `
      <form class="create-chat">
        {{{ Title }}}
        {{{ ChatNameField }}}
        {{{ Button }}}
      </form>
    `
  }
}

export default connect(({ newChatName }) => ({ newChatName }), {
  setNewChatName: (dispatch, value) => dispatch({ newChatName: value }),
})(CreateChat)
