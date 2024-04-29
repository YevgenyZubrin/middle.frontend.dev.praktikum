import Block from '../../core/Block'
import { Button } from '../Button'

interface AvatarProps {
  Button?: Button
  changeAvatar: () => void
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      Button: new Button({
        className: 'avatar__change-button',
        text: 'Сменить аватар',
        onClick: () => {
          props.changeAvatar()
        },
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
