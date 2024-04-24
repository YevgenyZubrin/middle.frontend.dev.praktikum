// @ts-nocheck

import Block from '../../core/Block'
import { ErrorBlock } from '../../components'

export default class Custom404 extends Block {
  constructor(props) {
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
