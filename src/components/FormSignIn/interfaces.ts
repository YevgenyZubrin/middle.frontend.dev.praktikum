import Block from '../../core/Block'
import { SignInFormType } from '../../core/types'
import { ButtonProps } from '../Button/interfaces'
import { FieldProps } from '../Field/interfaces'

export interface FormSignInProps {
  events?: { submit: (e: Event) => void }
  onSubmit?: (e: Event) => void
  LoginField?: Block<FieldProps>
  PasswordField?: Block<FieldProps>
  SubmitButton?: Block<ButtonProps>
  signInForm: SignInFormType
}
