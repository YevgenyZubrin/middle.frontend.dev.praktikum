import Block from '../../core/Block'
import { TypographyProps } from '../Typography/interfaces'

export interface IconButtonProps {
  className?: string
  icon: Block
  text?: string
  onClick?: () => void
  Text?: Block<TypographyProps>
  events?: {
    click: () => void
  }
}
