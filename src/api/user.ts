import { ISearchUser } from '../controller/user'
import HTTPTransport from '../core/HTTPTransport'
import { PasswordFormValuesType, UserValueType } from '../core/types'

const transport = new HTTPTransport('/user')

export interface IProfile {
  first_name: string
  second_name: string
  login: string
  email: string
  display_name: string
  phone: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export class UserApi {
  async changeProfile(data: IProfile): Promise<UserValueType> {
    const response = await transport.put('/profile', { data })
    return JSON.parse(response)
  }

  async changeAvatar(data: FormData): Promise<UserValueType> {
    const response = await transport.put('/profile/avatar', { data })
    return JSON.parse(response)
  }

  async changePassword(data: PasswordFormValuesType): Promise<void> {
    await transport.put('/password', { data })
  }

  async searchUser(login: string): Promise<ISearchUser[]> {
    const response = await transport.post('/search', { data: { login } })
    return JSON.parse(response)
  }
}
