import Block from './Block'
import {
  deafultSignInValues,
  deafultSignUpValues,
  defaultAddOrDeleteUserForm,
  defaultPasswordValues,
  defaultUserValues,
} from './Store'

export type IChildren = Record<string, typeof Block>

export type AddOrDeleteUserFormType = typeof defaultAddOrDeleteUserForm

export type UserValueType = typeof defaultUserValues

export type PasswordFormValuesType = typeof defaultPasswordValues

export type PasswordFormType = {
  values: PasswordFormValuesType
  errors: PasswordFormValuesType
}

export type UserType = {
  values: UserValueType
  errors: UserValueType
}

export type SignInFormValuesType = typeof deafultSignInValues

export type SignInFormType = {
  values: SignInFormValuesType
  errors: SignInFormValuesType
}

export type SignUpFormValuesType = typeof deafultSignUpValues

export type SignUpFormType = {
  values: SignUpFormValuesType
  errors: SignUpFormValuesType
}

type LastMessageType = {
  user: {
    first_name: string
    second_name: string
    display_name: string
    login: string
    avatar: string | null
  }
  time: string | Date
  content: string
  id: number
}

export type ChatType = {
  id: number
  title: string
  avatar: string | null
  created_by: number
  unread_count: number
  last_message: LastMessageType | null
}

export type MessageType = {
  content: string
  type: 'message'
  time: string | Date
  user_id: number
  id: number
}

export type StateType = {
  isLoading: boolean
  chats: ChatType[]
  activeChat: ChatType | null
  avatarFileName: string
  isProfileChange: boolean
  isPasswordChange: boolean
  isChooseFileError: boolean
  isChangeAvatarError: boolean
  isCreateChatModalOpen: boolean
  newChatName: string
  user: UserType
  signUpForm: SignUpFormType
  signInForm: SignInFormType
  passwordForm: PasswordFormType
  addOrDeleteUserForm: AddOrDeleteUserFormType
  isAddUserToChatModalOpen: boolean
  isDeleteUserToChatModalOpen: boolean
  isUserActionMenuOpen: boolean
  chatToken: string
  messages: MessageType[]
  signUpError: string
  loginError: string
  changeProfileError: string
  changePasswordError: string
}

export interface IMessagesPerDay {
  text: string
  time: string
  unread: boolean
  type: string
}

export interface IMessages {
  date: string
  messagesPerDay: IMessagesPerDay[]
}

export interface IChatList {
  id: string
  nickname: string
  lastMessage: string
  lastMessageTime: string
  unreadMessages: number
  imgUrl: string
  choosed: boolean
  messages: IMessages[]
}
