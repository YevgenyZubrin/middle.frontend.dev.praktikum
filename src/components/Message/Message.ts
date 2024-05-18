import Block from '../../core/Block'
import { connect } from '../../utils'
import { MessageProps } from './interfaces'

class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super({
      ...props,
    })
  }

  render() {
    const type = this.props.user.values.id === this.props.user_id ? 'out' : 'in'

    return `
      <div class="message ${type}">
        {{content}}
      </div>
    `
  }
}

export default connect(({ user }) => ({ user }))(Message)
