import EventBus from './EventBus'
import { StateType } from './types'

export const StoreEvents = {
  Updated: 'Updated',
} as const

export const deafultSignUpValues = {
  email: '',
  first_name: '',
  second_name: '',
  login: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

export const deafultSignInValues = {
  login: '',
  password: '',
}

export const defaultUserValues = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  avatar: '',
  id: 0,
}

export const defaultPasswordValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const defaultAddOrDeleteUserForm = {
  values: {
    login: '',
  },
  errors: {
    login: '',
  },
}

class Store extends EventBus<keyof typeof StoreEvents> {
  private state: StateType

  constructor() {
    super()

    this.state = {
      isLoading: false,
      chats: [],
      activeChat: null,
      avatarFileName: '',
      isProfileChange: false,
      isPasswordChange: false,
      isChooseFileError: false,
      isChangeAvatarError: false,
      isCreateChatModalOpen: false,
      newChatName: '',
      user: {
        values: defaultUserValues,
        errors: defaultUserValues,
      },
      signUpForm: {
        values: deafultSignUpValues,
        errors: deafultSignUpValues,
      },
      signInForm: {
        values: deafultSignInValues,
        errors: deafultSignInValues,
      },
      passwordForm: {
        values: defaultPasswordValues,
        errors: defaultPasswordValues,
      },
      addOrDeleteUserForm: defaultAddOrDeleteUserForm,
      isAddUserToChatModalOpen: false,
      isDeleteUserToChatModalOpen: false,
      isChatActionMenuOpen: false,
      chatToken: '',
      messages: [],
      signUpError: '',
      loginError: '',
      changeProfileError: '',
      changePasswordError: '',
      isChangeChatAvatarModalOpen: false,
      chatUsers: [],
    }
  }

  getState() {
    return this.state
  }

  setState(newState: Partial<StateType>) {
    this.state = { ...this.state, ...newState }
    this.emit(StoreEvents.Updated)
  }
}

export default new Store()
