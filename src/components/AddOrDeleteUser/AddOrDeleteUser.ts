import Block from '../../core/Block'
import { connect, validate } from '../../utils'
import { Button } from '../Button'
import { Typography } from '../Typography'
import AddDeleteLoginField from './AddDeleteLoginField'
import { AddOrDeleteUserProps } from './interfaces'

class AddOrDeleteUser extends Block<AddOrDeleteUserProps> {
  constructor(props: AddOrDeleteUserProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      Button: new Button({
        className: 'add-or-delete-user__button',
        text: props.isAddUser ? 'Добавить' : 'Удалить',
        filled: true,
      }),
      LoginField: new AddDeleteLoginField({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('login', e.target.value)
          }
        },
        className: 'add-or-delete-user__input',
        labelText: 'Логин',
        id: 'userLogin',
        type: 'text',
        value: props.addOrDeleteUserForm.values.login,
      }),
      Title: new Typography({
        className: 'add-or-delete-user__title',
        text: props.isAddUser ? 'Добавить пользователя' : 'Удалить пользователя',
      }),
      UserListTitle: new Typography({
        className: 'add-or-delete-user__users-list-title',
        text: 'Пользователи для удаления:',
      }),
    })
  }

  validateField(fieldName: string, value: string) {
    const errorText = validate(fieldName, value)
    this.props.setAddOrDeletUserForm({
      errors: { ...this.props.addOrDeleteUserForm.errors, [fieldName]: errorText },
      values: { ...this.props.addOrDeleteUserForm.values, [fieldName]: value },
    })
  }

  render() {
    const usersList = (this.props.chatUsers as string[]).map((item) => `<li>${item}</li>`).join('')

    return `
      <div class="add-or-delete-user">
        <form>
          {{{ Title }}}
          {{{ LoginField }}}
          {{{ Button }}}
        </form>

        {{#unless isAddUser}}
          <div>
            {{{ UserListTitle }}}
            <ul class='add-or-delete-user__users-list'>
              ${usersList}
            </ul>
          </div>
        {{/unless}}
      </div>
    `
  }
}

export default connect(({ addOrDeleteUserForm, chatUsers, user }) => ({ addOrDeleteUserForm, chatUsers, user }), {
  setAddOrDeletUserForm: (dispatch, value) => dispatch({ addOrDeleteUserForm: value }),
})(AddOrDeleteUser)
