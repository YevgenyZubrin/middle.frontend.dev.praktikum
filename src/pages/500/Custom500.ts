// @ts-nocheck

import Block from '../../core/Block'
import { ErrorBlock } from '../../components'

export default class Custom500 extends Block {
  constructor(props) {
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
