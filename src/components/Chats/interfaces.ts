import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { ChatFooterProps } from '../ChatFooter/interfaces'
import { ChatHeaderProps } from '../ChatHeader/interfaces'
import { InputProps } from '../Input/interfaces'
import { MessagesBlockProps } from '../MessagesBlock/interfaces'
import { ModalProps } from '../Modal/interfaces'

export interface ChatsProps {
  isSomeChatChoosed?: boolean
  chatsKeys?: string[]
  ProfileButton?: Block<ButtonProps>
  AddChatButton?: Block<ButtonProps>
  SearchInput?: Block<InputProps>
  ChatHeader?: Block<ChatHeaderProps>
  ChatFooter?: Block<ChatFooterProps>
  AddUserModal?: Block<ModalProps>
  RemoveUserModal?: Block<ModalProps>
  CreateChatModal?: Block<ModalProps>
  MessagesBlock?: Block<MessagesBlockProps>
  isAddUserToChatModalOpen: boolean
  isDeleteUserToChatModalOpen: boolean
}
