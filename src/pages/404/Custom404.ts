import Block from '../../core/Block'
import { ErrorBlock } from '../../components'

interface Custom404Props {
  ErrorBlock: Block
}

export default class Custom404 extends Block<Custom404Props> {
  constructor(props: Custom404Props) {
    super({
      ...props,
      ErrorBlock: new ErrorBlock({
        errorCode: '404',
        errorDescription: 'Не туда попали',
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
