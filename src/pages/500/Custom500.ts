import Block from '../../core/Block'
import { ErrorBlock } from '../../components'
import { CustomErrorProps } from '../404/interfaces'

export default class Custom500 extends Block<CustomErrorProps> {
  constructor(props?: CustomErrorProps) {
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
