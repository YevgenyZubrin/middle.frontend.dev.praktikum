import Block from '../../core/Block'
import { Button } from '../Button'
import { Field } from '../Field'
import { Typography } from '../Typography'

export default class AddOrDeleteUser extends Block {
  constructor(props) {
    super({
      ...props,
      Button: new Button({
        className: 'add-or-delete-user__button',
        text: props.isAddUser ? 'Добавить' : 'Удалить',
        onClick: () => {

        },
        filled: true,
      }),
      LoginField: new Field({
        className: 'add-or-delete-user__input',
        labelText: 'Логин',
        id: 'userLogin',
        type: 'text',
      }),
      Title: new Typography({
        className: 'add-or-delete-user__title',
        text: props.isAddUser ? 'Добавить пользователя' : 'Удалить пользователя',
      }),
    })
  }

  render() {
    return `
      <div class="add-or-delete-user">
        {{{ Title }}}
        {{{ LoginField }}}
        {{{ Button }}}
      </div>
    `
  }
}
