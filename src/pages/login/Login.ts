import Block from '../../core/Block'
import { Button } from '../../components'
import { FormSignUp } from '../../components/FormSignUp'
import { FormSignIn } from '../../components/FormSignIn'
import { getValidationResult } from '../../utils'
import { LoginProps } from './interface'
import getName from '../../utils/getName'

export default class Login extends Block {
  constructor(props: LoginProps) {
    super({
      ...props,
      AddAccountButton: new Button({
        filled: false,
        text: 'Нет аккаунта?',
        onClick: () => {
          this.setProps({ isRegistration: true })
        },
      }),
      SignInButton: new Button({
        filled: false,
        text: 'Войти',
        onClick: () => {
          this.setProps({ isRegistration: false })
        },
      }),
      FormSignUp: new FormSignUp({
        onSubmit: (e) => {
          const fields = this.children.FormSignUp.children.SignUpFields.children
          this.onSubmitValidation(e, fields)
        },
      }),
      FormSignIn: new FormSignIn({
        onSubmit: (e) => {
          const fields = this.children.FormSignIn.children
          this.onSubmitValidation(e, fields)
        },
      }),
    })
  }

  onSubmitValidation(e, fields) {
    e.preventDefault()
    const validationResultList = e.target !== null ? getValidationResult(e.target) : []

    if (!validationResultList.length) {
      this.setProps({
        editProfileMode: false,
        editPasswordMode: false,
      })
    } else {
      validationResultList.forEach((item) => {
        const [fieldName, errorText] = Object.entries(item).flat()
        const componentName = getName(fields, fieldName)

        fields[componentName].setProps({
          message: {
            text: errorText,
            type: 'error',
          },
        })
      })
    }
  }

  render() {
    return `
      <section class="login">
        <section class="login__container">

          {{#if isRegistration}}
            <h1 class="login__title">Регистрация</h1>

            {{{ FormSignUp }}}

            <div class="login__button-wrapper">
              {{{ SignInButton }}}
            </div>
          {{else}}
            <h1 class="login__title">Вход</h1>

            {{{ FormSignIn }}}

            <div class="login__button-wrapper">
              {{{ AddAccountButton }}}
            </div>
          {{/if}}
        </section>
      </section>`
  }
}
