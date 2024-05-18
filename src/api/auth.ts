import HTTPTransport from '../core/HTTPTransport'
import { SignInFormValuesType, SignUpFormValuesType, UserValueType } from '../core/types'

const transport = new HTTPTransport('/auth')

export class AuthApi {
  async signup(data: SignUpFormValuesType): Promise<void> {
    await transport.post('/signup', { data })
  }

  async signin(data: SignInFormValuesType): Promise<void> {
    await transport.post('/signin', { data })
  }

  async getUserInfo(): Promise<UserValueType> {
    const response = await transport.get('/user', {})
    return JSON.parse(response)
  }

  async logout(): Promise<void> {
    await transport.post('/logout', {})
  }
}
