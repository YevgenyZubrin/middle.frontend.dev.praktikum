import Block from '../../core/Block'
import { AddOrDeleteUserFormType } from '../../core/types'
import { ButtonProps } from '../Button/interfaces'
import { FieldProps } from '../Field/interfaces'
import { TypographyProps } from '../Typography/interfaces'

export interface AddOrDeleteUserProps {
  isAddUser: boolean
  Button?: Block<ButtonProps>
  LoginField?: Block<FieldProps>
  addOrDeleteUserForm: AddOrDeleteUserFormType
  Title?: Block<TypographyProps>
  events?: {
    submit: (e: Event) => void
  }
  onSubmit?: (e: Event) => void
}
