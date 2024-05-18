import Block from '../../core/Block'
import { connect, validate } from '../../utils'
import { Button } from '../Button'
import ConfirmPasswordField from './fields/ConfirmPasswordField'
import NewPasswordField from './fields/NewPasswordField'
import OldPasswordField from './fields/OldPasswordField'
import { ChangePasswordFormProps } from './interfaces'

class ChangePasswordForm extends Block<ChangePasswordFormProps> {
  constructor(props: ChangePasswordFormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      OldPasswordField: new OldPasswordField({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('oldPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'oldPassword',
        labelText: 'Старый пароль',
        type: 'password',
        disabled: false,
        value: props.passwordForm.values.oldPassword,
      }),
      NewPasswordField: new NewPasswordField({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('newPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'newPassword',
        labelText: 'Новый пароль',
        type: 'password',
        disabled: false,
        value: props.passwordForm.values.newPassword,
      }),
      ConfirmPasswordField: new ConfirmPasswordField({
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('confirmPassword', e.target.value)
          }
        },
        className: 'change-password-form__field',
        id: 'confirmPassword',
        labelText: 'Подтвердить пароль',
        type: 'password',
        disabled: false,
        value: props.passwordForm.values.confirmPassword,
      }),
      SaveButton: new Button({
        filled: true,
        text: 'Сохранить',
        className: 'change-password-form__save-button',
      }),
    })
  }

  validateField(fieldName: string, value: string) {
    this.props.setChangePasswordError('')

    const errorText = validate(fieldName, value)
    this.props.setPasswordForm({
      errors: { ...this.props.passwordForm.errors, [fieldName]: errorText },
      values: { ...this.props.passwordForm.values, [fieldName]: value },
    })
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

export default connect(({ passwordForm, changePasswordError }) => ({ passwordForm, changePasswordError }), {
  setPasswordForm: (dispatch, value) => dispatch({ passwordForm: value }),
  setChangePasswordError: (dispatch, value) => dispatch({ changePasswordError: value }),
})(ChangePasswordForm)
