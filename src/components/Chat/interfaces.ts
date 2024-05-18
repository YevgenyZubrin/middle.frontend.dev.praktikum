import Block from '../../core/Block'
import { ChatType, IChatList } from '../../core/types'
import { ChatImageProps } from '../ChatImage/interfaces'

export interface ChatProps extends IChatList {
  className?: string
  onClick?: () => void
  ChatImage: Block<ChatImageProps>
  events: { click: () => void }
  activeChat: ChatType | null
}
