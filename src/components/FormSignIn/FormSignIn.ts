import Block from '../../core/Block'
import { validate } from '../../utils'
import { Button } from '../Button'
import { Field } from '../Field'

export default class FormSignIn extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      LoginField: new Field({
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        onBlur: (e) => {
          this.validateField('login', e.target.value)
        },
      }),
      PasswordField: new Field({
        id: 'password',
        labelText: 'Пароль',
        type: 'password',
        disabled: false,
        onBlur: (e) => {
          this.validateField('password', e.target.value)
        },
      }),
      SubmitButton: new Button({
        filled: true,
        text: 'Авторизоваться',
        className: 'login__submit',
      }),
    })
  }

  validateField(fieldName, value) {
    const componentName = Object.entries(this.children)
      .map(([name, component]) => ({ name, props: component.props }))
      .find((item) => item.props.id === fieldName)?.name

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
      <form>
        {{{ LoginField }}}
        {{{ PasswordField }}}

        {{{ SubmitButton }}}
      </form>
    `
  }
}
