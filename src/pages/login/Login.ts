import Block from '../../core/Block'
import { Button, Field } from '../../components'
import { getComponentsList } from '../../utils'

export default class Login extends Block {
  constructor(props) {
    const signUpFields = getComponentsList(
      props.signUpFields,
      Field,
      {
        onBlur: (e) => {
          console.log(e)
        },
      },
    )

    super({
      ...props,
      SubmitButton: new Button({
        filled: true,
        text: 'Авторизоваться',
        className: 'login__submit',
        onClick: (e) => {
          e.preventDefault()
          console.log({
            login: this.children.LoginField,
            password: this.children.PasswordField.value,
          })
        },
      }),
      AddAccountButton: new Button({
        filled: false,
        text: 'Нет аккаунта?',
        onClick: () => {
          this.setProps({ isRegistration: true })
        },
      }),
      SignUpButton: new Button({
        filled: true,
        text: 'Зарегистрироваться',
        className: 'login__submit',
        // onClick: () => {
        //   this.setProps({ isRegistration: true })
        // },
      }),
      SignInButton: new Button({
        filled: false,
        text: 'Войти',
        onClick: () => {
          this.setProps({ isRegistration: false })
        },
      }),
      LoginField: new Field({
        onBlur: (e) => { this.validateField(e) },
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        value: 'lol',
      }),
      PasswordField: new Field({
        id: 'password',
        labelText: 'Пароль',
        type: 'password',
        disabled: false,
      }),
      signUpFieldsKeys: Object.keys(signUpFields),
      ...signUpFields,
    })
  }

  validateField(e) {
    if (e.target.value === 'err') {
      this.children.LoginField.setProps({
        message: {
          text: 'Неверный логин',
          type: 'error',
        },
      })
    } else {
      this.children.LoginField.setProps({
        message: {},
      })
    }
  }

  render() {
    return `
      <section class="login">
        <section class="login__container">

          {{#if isRegistration}}
            <h1 class="login__title">Регистрация</h1>

            <form>
              ${this.props.signUpFieldsKeys.map((key) => `{{{ ${key} }}}`).join('')}

              {{{ SignUpButton }}}
            <form>

            <div class="login__button-wrapper">
              {{{ SignInButton }}}
            </div>
          {{else}}
            <h1 class="login__title">Вход</h1>

            <form>
              {{{ LoginField }}}
              {{{ PasswordField }}}

              {{{ SubmitButton }}}
            </form>

            <div class="login__button-wrapper">
              {{{ AddAccountButton }}}
            </div>
          {{/if}}
        </section>
        <a href="/">На главную</a>
      </section>`
  }
}
