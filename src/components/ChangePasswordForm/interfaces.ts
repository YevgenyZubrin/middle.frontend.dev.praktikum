import Block from '../../core/Block'
import { PasswordFormType } from '../../core/types'
import { ButtonProps } from '../Button/interfaces'
import { FieldProps } from '../Field/interfaces'

export interface ChangePasswordFormProps {
  events?: { submit: (e: Event) => void }
  onSubmit: (e: Event) => void
  OldPasswordField?: Block<FieldProps>
  NewPasswordField?: Block<FieldProps>
  ConfirmPasswordField?: Block<FieldProps>
  SaveButton?: Block<ButtonProps>
  passwordForm: PasswordFormType
}
