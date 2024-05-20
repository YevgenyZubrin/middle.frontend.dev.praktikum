import Block from '../../core/Block'
import { connect } from '../../utils'
import { Button } from '../Button'
import { AvatarProps } from './interfaces'

class Avatar extends Block<AvatarProps> {
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
      <div class='avatar'>
        {{#if user.values.avatar}}
          <img class='avatar__image' src='{{user.values.avatar}}' alt='avatar' />
        {{/if}}
        {{{ Button }}}
      </div>
    `
  }
}

export default connect(({ user }) => ({ user }))(Avatar)
