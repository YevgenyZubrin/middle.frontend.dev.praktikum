import Block from '../../core/Block'
import { Button } from '../Button'

export default class Avatar extends Block {
  constructor(props) {
    super({
      ...props,
      Button: new Button({
        className: 'avatar__change-button',
        text: 'Сменить аватар',
        onClick: () => {
          props.changeAvatar()
        },
        isChangeAvatar: true,
      }),
    })
  }

  render() {
    return `
      <div class="avatar">
        {{{ Button }}}
      </div>
    `
  }
}
