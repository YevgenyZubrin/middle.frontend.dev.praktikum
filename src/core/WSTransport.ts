import { getErrorMessage } from '../utils'
import Store from './Store'

class WSTransport {
  socket: WebSocket | null = null

  interval: number = 0

  openConnection(userId: number, chatId: number, chatToken: string) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`)

    this.socket.addEventListener('open', () => {
      Store.setState({ messages: [] })

      this.socket?.send(
        JSON.stringify({
          type: 'get old',
          content: '0',
        }),
      )

      // eslint-disable-next-line no-console
      console.log('Соединение установлено')
    })

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        // eslint-disable-next-line no-console
        console.log('Соединение закрыто чисто')
      } else {
        // eslint-disable-next-line no-console
        console.log('Обрыв соединения')
      }

      // eslint-disable-next-line no-console
      console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    })

    this.socket.addEventListener('message', (event) => {
      try {
        const parsedData = JSON.parse(event.data)

        const adaptDataToStore = () => {
          if (Array.isArray(parsedData)) {
            Store.setState({
              messages: [
                ...Store.getState().messages,
                ...parsedData
                  .sort((a, b) => {
                    const aMilliseconds = new Date(a.time).getTime()
                    const bMilliseconds = new Date(b.time).getTime()

                    return aMilliseconds - bMilliseconds
                  })
                  .map((item) => ({
                    content: item.content,
                    type: item.type,
                    time: item.time,
                    user_id: item.user_id,
                    id: item.id,
                  })),
              ],
            })
          }
        }
        adaptDataToStore()
        if (parsedData.type === 'message') {
          Store.setState({ messages: [...Store.getState().messages, parsedData] })
        }
      } catch (err: unknown) {
        throw new Error(getErrorMessage(err))
      }
    })

    this.socket.addEventListener('error', (event) => {
      // eslint-disable-next-line no-console
      console.log('Ошибка', event)
    })

    this.interval = setInterval(() => {
      this.socket?.send(
        JSON.stringify({
          type: 'ping',
        }),
      )
    }, 5000)
  }

  sendMessage(message: string) {
    this.socket?.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    )
  }

  closeConnection() {
    this.socket?.close()

    Store.setState({ messages: [] })

    clearInterval(this.interval)
  }
}

export default new WSTransport()
