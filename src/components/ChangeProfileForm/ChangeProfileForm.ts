import Block from '../../core/Block'
import { connect } from '../../utils'
import { Button } from '../Button'
import { ProfileFields } from '../ProfileFields'
import { ChangeProfileFormProps } from './interfaces'

class ChangeProfileForm extends Block<ChangeProfileFormProps> {
  constructor(props: ChangeProfileFormProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
      SaveButton: new Button({
        filled: true,
        text: 'Сохранить',
        className: 'change-profile-form__save-button',
        onClick: () => {
          this.setProps({
            editProfileMode: false,
            editPasswordMode: false,
          })
        },
      }),
      ProfileFields: new ProfileFields({ editProfileMode: true }),
    })
  }

  render() {
    return `
      <form class='change-profile-form'>
        {{{ ProfileFields }}}
        
        <div class='change-profile-form__button-wrapper'>
          {{{ SaveButton }}}
        </div>
      </form>
    `
  }
}

export default connect(({ user }) => ({ user }))(ChangeProfileForm)
