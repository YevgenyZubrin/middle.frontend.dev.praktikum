import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { FieldProps } from '../Field/interfaces'

export interface ChangeProfileFormProps {
  events?: { submit: (e: Event) => void }
  onSubmit: (e: Event) => void
  SaveButton?: Block<ButtonProps>
  ProfileFields?: Block<FieldProps>
}
