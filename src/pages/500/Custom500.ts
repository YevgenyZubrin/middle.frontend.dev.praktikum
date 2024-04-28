import Block from '../../core/Block'
import { ErrorBlock } from '../../components'

interface Custom500Props {
  ErrorBlock: Block
}

export default class Custom500 extends Block<Custom500Props> {
  constructor(props: Custom500Props) {
    super({
      ...props,
      ErrorBlock: new ErrorBlock({
        errorCode: '500',
        errorDescription: 'Мы уже фиксим',
        backLinkText: 'Назад к чатам',
      }),
    })
  }

  render() {
    return `
      <div>
        {{{ ErrorBlock }}}
      </div>
    `
  }
}
