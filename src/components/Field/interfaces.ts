import Block from '../../core/Block'
import { InputProps } from '../Input/interfaces'

export interface FieldProps {
  isProfile?: boolean
  className?: string
  id: string
  labelText: string
  message?: { text: string; type: string }
  Input?: Block<InputProps>
  onBlur?: (e: Event) => void
  onChange?: (e: Event) => void
  type: string
  disabled?: boolean
  ProfileInput?: Block<InputProps>
}
