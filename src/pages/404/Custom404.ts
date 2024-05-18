import Block from '../../core/Block'
import { ErrorBlock } from '../../components'
import { Custom404Props } from './interfaces'

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
