import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { FormSignUpProps } from '../FormSignUp/interfaces'

export interface SignUpProps {
  AddAccountButton?: Block<ButtonProps>
  SignInButton?: Block<ButtonProps>
  FormSignUp?: Block<FormSignUpProps>
}
