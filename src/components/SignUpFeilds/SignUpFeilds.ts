import Block from '../../core/Block'
import { connect, validate } from '../../utils'
import SignUpEmailField from './fields/SignUpEmailField'
import SignUpLoginField from './fields/SignUpLoginField'
import SignUpFirstnameField from './fields/SignUpFirstnameField'
import SignUpSecondnameField from './fields/SignUpSecondnameField'
import SignUpPhoneField from './fields/SignUpPhoneField'
import SignUpPasswordField from './fields/SignUpPasswordField'
import SignUpConfirmPasswordField from './fields/SignUpConfirmPasswordField'
import { SignUpFieldsProps } from './interfaces'

class SignUpFields extends Block<SignUpFieldsProps> {
  constructor(props: SignUpFieldsProps) {
    super({
      ...props,
      EmailField: new SignUpEmailField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('email', e.target.value)
          }
        },
        id: 'email',
        labelText: 'Почта',
        type: 'text',
        disabled: false,
        value: props.signUpForm.values.email,
      }),
      LoginField: new SignUpLoginField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('login', e.target.value)
          }
        },
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        value: props.signUpForm.values.login,
      }),
      FirstNameField: new SignUpFirstnameField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('first_name', e.target.value)
          }
        },
        id: 'first_name',
        labelText: 'Имя',
        type: 'text',
        disabled: false,
        value: props.signUpForm.values.first_name,
      }),
      SecondNameField: new SignUpSecondnameField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('second_name', e.target.value)
          }
        },
        id: 'second_name',
        labelText: 'Фамилия',
        type: 'text',
        disabled: false,
        value: props.signUpForm.values.second_name,
      }),
      PhoneField: new SignUpPhoneField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('phone', e.target.value)
          }
        },
        id: 'phone',
        labelText: 'Телефон',
        type: 'text',
        disabled: false,
        value: props.signUpForm.values.phone,
      }),
      PasswordField: new SignUpPasswordField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('password', e.target.value)
          }
        },
        id: 'password',
        labelText: 'Пароль',
        type: 'password',
        disabled: false,
        value: props.signUpForm.values.password,
      }),
      ConfirmPasswordField: new SignUpConfirmPasswordField({
        onBlur: (e: Event) => {
          if (e.target instanceof HTMLInputElement) {
            this.validateField('confirmPassword', e.target.value)
          }
        },
        id: 'confirmPassword',
        labelText: 'Пароль (еще раз)',
        type: 'password',
        disabled: false,
        value: props.signUpForm.values.confirmPassword,
      }),
    })
  }

  validateField(fieldName: string, value: string) {
    const errorText = validate(fieldName, value)
    this.props.setSignUpForm({
      errors: { ...this.props.signUpForm.errors, [fieldName]: errorText },
      values: { ...this.props.signUpForm.values, [fieldName]: value },
    })
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

export default connect(({ signUpForm }) => ({ signUpForm }), {
  setSignUpForm: (dispatch, value) => dispatch({ signUpForm: value }),
})(SignUpFields)
