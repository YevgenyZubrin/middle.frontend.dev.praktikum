import { AuthApi } from '../api/auth'
import Store, { defaultUserValues } from '../core/Store'
import Router from '../core/Router'
import { getErrorMessage, getImageUrl } from '../utils'
import { getChats } from './chats'
import { SignInFormValuesType, SignUpFormValuesType } from '../core/types'

const router = Router.getInstance('#app')
const authApi = new AuthApi()

export const signup = async (data: SignUpFormValuesType): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    await authApi.signup(data)
    router.go('/messenger')
  } catch (err: unknown) {
    Store.setState({ signUpError: JSON.parse(getErrorMessage(err)).reason })
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const getUserInfo = async (): Promise<boolean> => {
  try {
    const response = await authApi.getUserInfo()

    Store.setState({
      user: { values: { ...response, avatar: getImageUrl(response.avatar) }, errors: defaultUserValues },
    })
    return true
  } catch {
    return false
  }
}

export const signin = async (data: SignInFormValuesType): Promise<void> => {
  Store.setState({ isLoading: true })

  try {
    await authApi.signin(data)
    router.go('/messenger')
    await getUserInfo()
    await getChats()
  } catch (err: unknown) {
    Store.setState({ loginError: JSON.parse(getErrorMessage(err)).reason })
  } finally {
    Store.setState({ isLoading: false })
  }
}

export const logout = async (): Promise<void> => {
  try {
    await authApi.logout()
    router.go('/')
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err))
  }
}
