import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { FormSignInProps } from '../FormSignIn/interfaces'

export interface LoginProps {
  AddAccountButton?: Block<ButtonProps>
  FormSignIn?: Block<FormSignInProps>
}
