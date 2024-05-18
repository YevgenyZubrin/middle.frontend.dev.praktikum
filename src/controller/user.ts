import Store, { defaultUserValues } from '../core/Store'
import { IProfile, UserApi } from '../api/user'
import { getErrorMessage, getImageUrl } from '../utils'
import { PasswordFormValuesType } from '../core/types'

const usersApi = new UserApi()

export interface ISearchUser {
  avatar: string | null
  display_name: string | null
  first_name: string
  id: number
  login: string
  second_name: string
}

export const changeProfile = async (data: IProfile): Promise<boolean> => {
  Store.setState({ isLoading: true })

  try {
    const response = await usersApi.changeProfile(data)
    Store.setState({
      user: { values: { ...response, avatar: getImageUrl(response.avatar) }, errors: defaultUserValues },
    })
    return true
  } catch (err: unknown) {
    Store.setState({ changeProfileError: JSON.parse(getErrorMessage(err)).reason })
    return false
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const changeAvatar = async (data: FormData): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    const response = await usersApi.changeAvatar(data)
    Store.setState({
      user: { values: { ...response, avatar: getImageUrl(response.avatar) }, errors: defaultUserValues },
    })
  } catch {
    Store.setState({ isChangeAvatarError: true })
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const changePassword = async (data: PasswordFormValuesType): Promise<boolean> => {
  Store.setState({ isLoading: true })

  try {
    await usersApi.changePassword(data)
    return true
  } catch (err: unknown) {
    Store.setState({ changePasswordError: JSON.parse(getErrorMessage(err)).reason })
    return false
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const searchUser = async (login: string): Promise<ISearchUser[]> => {
  Store.setState({ isLoading: true })

  try {
    return await usersApi.searchUser(login)
  } catch {
    return []
  } finally {
    Store.setState({ isLoading: false })
  }
}
