import Store from './Store'

class WSTransport {
  socket: WebSocket | null = null

  interval: number = 0

  openConnection(userId: number, chatId: number, chatToken: string) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`)

    this.socket.addEventListener('open', () => {
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
      if (JSON.parse(event.data).type === 'message') {
        Store.setState({ messages: [...Store.getState().messages, JSON.parse(event.data)] })
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
