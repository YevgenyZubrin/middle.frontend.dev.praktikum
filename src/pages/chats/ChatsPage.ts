import Block from '../../core/Block'
import { Chats } from '../../components/Chats'

interface ChatsPageProps {
  Chats?: Chats
}

export default class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super({
      ...props,
      Chats: new Chats({}),
    })
  }

  render() {
    return `
      <div>
        {{{ Chats }}}
      </div>
    `
  }
}
