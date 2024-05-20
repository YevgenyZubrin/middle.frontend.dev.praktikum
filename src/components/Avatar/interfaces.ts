import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'

export interface AvatarProps {
  Button?: Block<ButtonProps>
  changeAvatar: () => void
}
