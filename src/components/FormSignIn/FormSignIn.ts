import Block from '../../core/Block'
import { connect, validate } from '../../utils'
import { Button } from '../Button'
import SignInLoginField from './fields/SignInLoginField'
import SignInPasswordField from './fields/SignInPasswordField'
import { FormSignInProps } from './interfaces'

class FormSignIn extends Block<FormSignInProps> {
  constructor(props: FormSignInProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      LoginField: new SignInLoginField({
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('login', e.target.value)
          }
        },
        value: props.signInForm.values.login,
      }),
      PasswordField: new SignInPasswordField({
        id: 'password',
        labelText: 'Пароль',
        type: 'password',
        disabled: false,
        onBlur: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            this.validateField('password', e.target.value)
          }
        },
        value: props.signInForm.values.password,
      }),
      SubmitButton: new Button({
        filled: true,
        text: 'Авторизоваться',
        className: 'login__submit',
      }),
    })
  }

  validateField(fieldName: string, value: string) {
    const errorText = validate(fieldName, value)
    this.props.setSignInForm({
      errors: { ...this.props.signInForm.errors, [fieldName]: errorText },
      values: { ...this.props.signInForm.values, [fieldName]: value },
    })
  }

  render() {
    return `
      <form>
        {{{ LoginField }}}
        {{{ PasswordField }}}

        {{{ SubmitButton }}}
      </form>
    `
  }
}

export default connect(({ signInForm }) => ({ signInForm }), {
  setSignInForm: (dispatch, value) => dispatch({ signInForm: value }),
})(FormSignIn)
