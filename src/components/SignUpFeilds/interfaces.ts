import Block from '../../core/Block'
import { SignUpFormType } from '../../core/types'
import { FieldProps } from '../Field/interfaces'

export interface SignUpFieldsProps {
  EmailField?: Block<FieldProps>
  LoginField?: Block<FieldProps>
  FirstNameField?: Block<FieldProps>
  SecondNameField?: Block<FieldProps>
  PhoneField?: Block<FieldProps>
  PasswordField?: Block<FieldProps>
  ConfirmPasswordField?: Block<FieldProps>
  signUpForm: SignUpFormType
}
