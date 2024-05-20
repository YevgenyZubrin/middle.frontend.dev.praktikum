import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { FieldProps } from '../Field/interfaces'
import { TypographyProps } from '../Typography/interfaces'

export interface CreateChatProps {
  Button?: Block<ButtonProps>
  ChatNameField?: Block<FieldProps>
  Title?: Block<TypographyProps>
  events: {
    submit: (e: Event) => void
  }
  onSubmit: (e: Event) => void
}
