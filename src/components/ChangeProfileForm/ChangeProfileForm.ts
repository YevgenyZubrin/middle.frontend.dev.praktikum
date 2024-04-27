import Block from '../../core/Block'
import { Button } from '../Button'
import { ProfileFields } from '../ProfileFields'

export default class ChangeProfileForm extends Block {
  constructor(props) {
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

        <div class="change-profile-form__button-wrapper">
          {{{ SaveButton }}}
        </div>

      </form>
    `
  }
}
