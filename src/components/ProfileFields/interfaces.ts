import Block from '../../core/Block'
import { UserType } from '../../core/types'
import { FieldProps } from '../Field/interfaces'

export interface ProfileFieldsProps {
  EmailField?: Block<FieldProps>
  LoginField?: Block<FieldProps>
  FirstNameField?: Block<FieldProps>
  SecondNameField?: Block<FieldProps>
  DisplayNameField?: Block<FieldProps>
  PhoneField?: Block<FieldProps>
  editProfileMode?: boolean
  user: UserType
}
