import Block from '../../core/Block'
import { ErrorBlock } from '../../components'
import { CustomErrorProps } from './interfaces'

export default class Custom404 extends Block<CustomErrorProps> {
  constructor(props?: CustomErrorProps) {
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
