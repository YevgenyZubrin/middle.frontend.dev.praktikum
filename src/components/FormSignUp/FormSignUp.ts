import Block from '../../core/Block'
import { Button } from '../Button'
import SignUpFields from '../SignUpFeilds/SignUpFeilds'
import { FormSignUpProps } from './interfaces'

class FormSignUp extends Block<FormSignUpProps> {
  constructor(props: FormSignUpProps) {
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

export default FormSignUp
