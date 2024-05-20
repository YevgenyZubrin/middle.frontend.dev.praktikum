import Block from '../../core/Block'
import { connect, validate } from '../../utils'
import DisplayNameField from './fields/DisplayNameField'
import EmailField from './fields/EmailField'
import FirstNameField from './fields/FirstNameField'
import LoginField from './fields/LoginField'
import PhoneField from './fields/PhoneField'
import SecondNameField from './fields/SecondNameField'
import { ProfileFieldsProps } from './interfaces'

class ProfileFields extends Block<ProfileFieldsProps> {
  constructor(props: ProfileFieldsProps) {
    super({
      ...props,
      EmailField: new EmailField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('email', e.target.value)
          }
        },
        id: 'email',
        labelText: 'Почта',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.email,
      }),
      LoginField: new LoginField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('login', e.target.value)
          }
        },
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.login,
      }),
      FirstNameField: new FirstNameField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('first_name', e.target.value)
          }
        },
        id: 'first_name',
        labelText: 'Имя',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.first_name,
      }),
      SecondNameField: new SecondNameField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('second_name', e.target.value)
          }
        },
        id: 'second_name',
        labelText: 'Фамилия',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.second_name,
      }),
      DisplayNameField: new DisplayNameField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('display_name', e.target.value)
          }
        },
        id: 'display_name',
        labelText: 'Имя в чате',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.display_name,
      }),
      PhoneField: new PhoneField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('phone', e.target.value)
          }
        },
        id: 'phone',
        labelText: 'Телефон',
        type: 'text',
        disabled: false,
        isProfile: true,
        value: props.user.values.phone,
      }),
    })
  }

  validateField(fieldName: string, value: string) {
    this.props.setChangeProfileError('')

    const errorText = validate(fieldName, value)
    this.props.setUser({
      errors: { ...this.props.user.errors, [fieldName]: errorText },
      values: { ...this.props.user.values, [fieldName]: value },
    })
  }

  render() {
    return `
      <div>
        {{{ EmailField }}}
        {{{ LoginField }}}
        {{{ FirstNameField }}}
        {{{ SecondNameField }}}
        {{{ DisplayNameField }}}
        {{{ PhoneField }}}
      </div>
    `
  }
}

export default connect(({ user, changeProfileError }) => ({ user, changeProfileError }), {
  setUser: (dispatch, value) => dispatch({ user: value }),
  setChangeProfileError: (dispatch, value) => dispatch({ changeProfileError: value }),
})(ProfileFields)
