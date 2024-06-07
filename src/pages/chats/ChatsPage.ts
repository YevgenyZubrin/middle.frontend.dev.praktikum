import Block from '../../core/Block'
import { Chat } from '../../components/Chat'
import { Chats } from '../../components/Chats'
import { connect, isEqual } from '../../utils'
import { getChats } from '../../controller/chats'
import { getUserInfo } from '../../controller/auth'
import Router from '../../core/Router'
import { ChatType } from '../../core/types'
import { ChatsPageProps } from './interfaces'

const router = Router.getInstance('#app')

class ChatsPage extends Block<ChatsPageProps> {
  interval: number = 0

  constructor(props: ChatsPageProps) {
    super({
      ...props,
      Chats: new Chats({}),
    })
  }

  componentDidMount(): void {
    getChats()
  }

  init(): void {
    const checkIsAuthorized = async () => {
      const isAuthorized = await getUserInfo()
      if (!isAuthorized) {
        router.go('/')
      }
    }
    checkIsAuthorized()

    const onChatClickBind = this.onChatClick.bind(this)
    const ChatList = new Chats({
      chatList: this.mapChatToComponent(this.props.chats, onChatClickBind) || [],
    })
    this.children = { ChatList }
  }

  onChatClick(chat: ChatType) {
    this.props.setActiveChat(chat)
  }

  mapChatToComponent(chats: ChatType[], hundler: (chat: ChatType) => void) {
    return chats?.map(
      (chat) =>
        new Chat({
          ...chat,
          onClick() {
            hundler(chat)
          },
        }),
    )
  }

  componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      const onChatClickBind = this.onChatClick.bind(this)
      this.children.ChatList.setProps({
        chatList: this.mapChatToComponent(newProps.chats, onChatClickBind) || [],
      })
    }
    return true
  }

  render() {
    return `
      <div>
        {{{ ChatList }}}
      </div>
    `
  }
}

export default connect(({ chats, activeChat }) => ({ chats, activeChat }), {
  setActiveChat: (dispatch, value) => dispatch({ activeChat: value }),
})(ChatsPage)
