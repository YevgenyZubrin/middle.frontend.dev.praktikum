import Block from '../../core/Block'
import { Button } from '../Button'
import SignUpFields from '../SignUpFeilds/SignUpFeilds'

export default class FormSignUp extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      SignUpButton: new Button({
        filled: true,
        text: 'Зарегистрироваться',
        className: 'login__submit',
      }),
      SignUpFields: new SignUpFields({}),
    })
  }

  render() {
    return `
      <form>
        {{{ SignUpFields }}}

        {{{ SignUpButton }}}
      </form>
    `
  }
}
