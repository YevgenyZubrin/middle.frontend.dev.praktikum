import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { SignUpFieldsProps } from '../SignUpFeilds/interfaces'

export interface FormSignUpProps {
  events?: { submit: (e: Event) => void }
  onSubmit?: (e: Event) => void
  SignUpFields?: Block<SignUpFieldsProps>
  SignUpButton?: Block<ButtonProps>
}
