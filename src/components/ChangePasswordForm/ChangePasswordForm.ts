import Block from '../../core/Block'
import { validate } from '../../utils'
import { Button } from '../Button'
import { Field } from '../Field'

interface ChangePasswordFormProps {
  events?: { submit: (e: Event) => void }
  onSubmit: (e: Event) => void
  OldPasswordField?: Field
  NewPasswordField?: Field
  ConfirmPasswordField?: Field
  SaveButton?: Button
}

export default class ChangePasswordForm extends Block<ChangePasswordFormProps> {
  constructor(props: ChangePasswordFormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      OldPasswordField: new Field({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validatePassword('oldPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'oldPassword',
        labelText: 'Старый пароль',
        type: 'password',
        disabled: false,
      }),
      NewPasswordField: new Field({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validatePassword('newPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'newPassword',
        labelText: 'Новый пароль',
        type: 'password',
        disabled: false,
      }),
      ConfirmPasswordField: new Field({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validatePassword('confirmPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'confirmPassword',
        labelText: 'Подтвердить пароль',
        type: 'password',
        disabled: false,
      }),
      SaveButton: new Button({
        filled: true,
        text: 'Сохранить',
        className: 'change-password-form__save-button',
      }),
    })
  }

  validatePassword(fieldName: string, value: string) {
    const componentName =
      Object.entries(this.children)
        .map(([name, component]) => ({ name, props: component.props }))
        .find((item) => item.props.id === fieldName)?.name ?? ''

    const errorText = validate(fieldName, value)

    if (errorText) {
      this.children[componentName].setProps({
        message: {
          text: errorText,
          type: 'error',
        },
      })
    } else {
      this.children[componentName].setProps({
        message: {},
      })
    }
  }

  render() {
    return `
      <form class='change-password-form'>
        {{{ OldPasswordField }}}
        {{{ NewPasswordField }}}
        {{{ ConfirmPasswordField }}}

        {{{ SaveButton }}}
      </form>
    `
  }
}
