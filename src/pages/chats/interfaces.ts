import { ChatsProps } from '../../components/Chats/interfaces'
import Block from '../../core/Block'
import { ChatType } from '../../core/types'

export interface ChatsPageProps {
  Chats: Block<ChatsProps>
  chats: ChatType[]
}
