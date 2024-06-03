import Store from '../core/Store'
import { ChatsApi } from '../api/chats'
import { searchUser } from './user'
import { getErrorMessage, getImageUrl } from '../utils'
import { ChatType } from '../core/types'

const chatsApi = new ChatsApi()

export const getChats = async (): Promise<ChatType[]> => {
  Store.setState({ isLoading: true })

  try {
    const response = await chatsApi.getChats()
    Store.setState({ chats: response.map((item) => ({ ...item, avatar: getImageUrl(item.avatar) })) })
    return response
  } catch (err) {
    return []
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const createChat = async (title: string): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    await chatsApi.createChat(title)
    await getChats()
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err))
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const addUserToChat = async (chatId: string, login: string): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    const userIdByLogin = (await searchUser(login)).find((item) => item.login === login)?.id ?? null
    if (userIdByLogin) {
      await chatsApi.addUserToChat(chatId, [userIdByLogin])
    } else {
      Store.setState({
        addOrDeleteUserForm: {
          ...Store.getState().addOrDeleteUserForm,
          errors: {
            login: 'Пользователя с таким логином не существует',
          },
        },
      })
    }
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err))
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const deleteUserFromChat = async (chatId: string, login: string): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    const userIdByLogin = (await searchUser(login)).find((item) => item.login === login)?.id ?? null

    if (userIdByLogin) {
      await chatsApi.deleteUserFromChat(chatId, [userIdByLogin])
    } else {
      Store.setState({
        addOrDeleteUserForm: {
          ...Store.getState().addOrDeleteUserForm,
          errors: {
            login: 'Пользователя с таким логином не существует',
          },
        },
      })
    }
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err))
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const getChatToken = async (chatId: number): Promise<string> => {
  try {
    const { token } = await chatsApi.getChatToken(chatId)
    return token
  } catch {
    return ''
  }
}

export const changeChatAvatar = async (data: FormData): Promise<void> => {
  try {
    await chatsApi.changeChatAvatar(data)
    await getChats()
    Store.setState({ avatarFileName: '' })
  } catch {
    Store.setState({ isChangeAvatarError: true })
  }
}

export const deleteChat = async (chatId: string): Promise<void> => {
  try {
    await chatsApi.deleteChat(chatId)
    await getChats()
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error))
  }
}

export const getChatUsers = async (chatId: string): Promise<void> => {
  try {
    const response = await chatsApi.getChatUsers(chatId)
    Store.setState({
      chatUsers: response.filter((item) => item.id !== Store.getState().user.values.id).map((item) => item.login),
    })
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error))
  }
}
