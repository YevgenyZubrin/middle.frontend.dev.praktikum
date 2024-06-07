import Block from '../../core/Block'
import { ChatType } from '../../core/types'
import { ChatImageProps } from '../ChatImage/interfaces'
import { IconButton } from '../IconButton'
import { TypographyProps } from '../Typography/interfaces'

export interface ChatHeaderProps {
  imgUrl: string
  nickname: string
  isChatActionMenuOpen?: boolean
  ChatImage?: Block<ChatImageProps>
  ChatName?: Block<TypographyProps>
  MenuButton?: IconButton
  UserActionsMenu?: Block
  activeChat: ChatType
}
