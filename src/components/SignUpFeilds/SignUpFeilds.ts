import Block from '../../core/Block'
import { validate } from '../../utils'
import { Field } from '../Field'

interface SignUpFieldsProps {
  EmailField?: Field
  LoginField?: Field
  FirstNameField?: Field
  SecondNameField?: Field
  PhoneField?: Field
  PasswordField?: Field
  ConfirmPasswordField?: Field
}

export default class SignUpFields extends Block<SignUpFieldsProps> {
  constructor(props: SignUpFieldsProps) {
    super({
      ...props,
      EmailField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('email', e.target.value)
          }
        },
        id: 'email',
        labelText: 'Почта',
        type: 'text',
        disabled: false,
      }),
      LoginField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('login', e.target.value)
          }
        },
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
      }),
      FirstNameField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('first_name', e.target.value)
          }
        },
        id: 'first_name',
        labelText: 'Имя',
        type: 'text',
        disabled: false,
      }),
      SecondNameField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('second_name', e.target.value)
          }
        },
        id: 'second_name',
        labelText: 'Фамилия',
        type: 'text',
        disabled: false,
      }),
      PhoneField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('phone', e.target.value)
          }
        },
        id: 'phone',
        labelText: 'Телефон',
        type: 'text',
        disabled: false,
      }),
      PasswordField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('password', e.target.value)
          }
        },
        id: 'password',
        labelText: 'Пароль',
        type: 'password',
        disabled: false,
      }),
      ConfirmPasswordField: new Field({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validate('confirmPassword', e.target.value)
          }
        },
        id: 'confirmPassword',
        labelText: 'Пароль (еще раз)',
        type: 'password',
        disabled: false,
      }),
    })
  }

  validate(fieldName: string, value: string) {
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
      <div>
        {{{ EmailField }}}
        {{{ LoginField }}}
        {{{ FirstNameField }}}
        {{{ SecondNameField }}}
        {{{ PhoneField }}}
        {{{ PasswordField }}}
        {{{ ConfirmPasswordField }}}
      </div>
    `
  }
}
