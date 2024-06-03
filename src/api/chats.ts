import HTTPTransport from '../core/HTTPTransport'
import { ChatType } from '../core/types'

const transport = new HTTPTransport('/chats')

interface ChatUser {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  role: string
}

export class ChatsApi {
  async getChats(): Promise<ChatType[]> {
    const response = await transport.get('/', {})
    return JSON.parse(response)
  }

  async createChat(title: string): Promise<void> {
    await transport.post('/', { data: { title } })
  }

  async addUserToChat(chatId: string, users: number[]): Promise<void> {
    await transport.put('/users', { data: { chatId, users } })
  }

  async deleteUserFromChat(chatId: string, users: number[]): Promise<void> {
    await transport.delete('/users', { data: { chatId, users } })
  }

  async getChatToken(chatId: number): Promise<{ token: string }> {
    const response = await transport.post(`/token/${chatId}`, {})
    return JSON.parse(response)
  }

  async changeChatAvatar(data: FormData): Promise<void> {
    await transport.put('/avatar', { data })
  }

  async deleteChat(chatId: string): Promise<void> {
    await transport.delete('/', { data: { chatId } })
  }

  async getChatUsers(chatId: string): Promise<ChatUser[]> {
    const response = await transport.get(`/${chatId}/users`, {})
    return JSON.parse(response)
  }
}
