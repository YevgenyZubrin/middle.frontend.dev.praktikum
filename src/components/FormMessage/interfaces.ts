import Block from '../../core/Block'
import { IconButton } from '../IconButton'
import { InputProps } from '../Input/interfaces'

export interface FormMessageProps {
  events?: { submit: (e: Event) => void }
  onSubmit?: (e: Event) => void
  SendMessageButton?: IconButton
  MessageInput?: Block<InputProps>
}
