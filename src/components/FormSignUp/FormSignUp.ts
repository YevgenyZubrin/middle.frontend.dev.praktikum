import Block from '../../core/Block'
import { Button } from '../Button'
import SignUpFields from '../SignUpFeilds/SignUpFeilds'

interface FormSignUpProps {
  events?: { submit: (e: Event) => void }
  onSubmit?: (e: Event) => void
  SignUpFields?: SignUpFields
  SignUpButton?: Button
}

export default class FormSignUp extends Block<FormSignUpProps> {
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
