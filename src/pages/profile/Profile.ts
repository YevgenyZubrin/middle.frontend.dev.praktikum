// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars from 'handlebars'
import { ChangeAvatarModal } from '../../components/ChangeAvatarModal'
import Block from '../../core/Block'
import {
  Button,
  BackLink,
  Avatar,
  Modal,
} from '../../components'
import { ProfileFields } from '../../components/ProfileFields'
import { Form } from '../../components/Form'
import { ChangeProfileForm } from '../../components/ChangeProfileForm'
import { ChangePasswordForm } from '../../components/ChangePasswordForm'
import { formSubmit, getValidationResult } from '../../utils'
import getName from '../../utils/getName'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

export default class Profile extends Block {
  constructor(props) {
    super({
      ...props,
      ChangePasswordButton: new Button({
        className: 'profile__button',
        text: 'Изменить пароль',
        onClick: () => {
          this.setProps({ editPasswordMode: true })
        },
      }),
      ChangeDataButton: new Button({
        className: 'profile__button',
        text: 'Изменить данные',
        onClick: () => {
          this.setProps({ editProfileMode: true })
        },
      }),
      ExitButton: new Button({
        className: 'profile__button profile__button_red',
        text: 'Выйти',
      }),
      BackLink: new BackLink({}),
      Avatar: new Avatar({
        changeAvatar: () => {
          this.children.Modal.setProps({ isOpen: true })
        },
      }),
      Modal: new Modal({
        isOpen: false,
        modalChildren: new ChangeAvatarModal({
          choosedFileName: '',
          isChooseFileError: false,
          isFileLoadError: false,
        }),
        className: 'profile__modal',
      }),
      ProfileFields: new ProfileFields({}),
      ChangeProfileForm: new ChangeProfileForm({
        onSubmit: (e: Event) => {
          const fields = this.children.ChangeProfileForm.children.ProfileFields.children
          this.onSubmitValidation(e, fields)
        },
      }),
      ChangePasswordForm: new Form({
        formChildren: new ChangePasswordForm({
          onSubmit: (e) => {
            const fields = this.children.ChangePasswordForm.children.formChildren.children
            this.onSubmitValidation(e, fields)
          },
        }),
      }),
    })
  }

  onSubmitValidation(e, fields) {
    e.preventDefault()
    const validationResultList = e.target !== null ? getValidationResult(e.target) : []

    if (!validationResultList.length) {
      this.setProps({
        editProfileMode: false,
        editPasswordMode: false,
      })
    } else {
      validationResultList.forEach((item) => {
        const [fieldName, errorText] = Object.entries(item).flat()
        const componentName = getName(fields, fieldName)

        fields[componentName].setProps({
          message: {
            text: errorText,
            type: 'error',
          },
        })
      })
    }
  }

  render() {
    return `
      <section class="profile">
        {{{ BackLink }}}
        <section class="profile__container">
          <div class="profile__avatar-wrapper {{className}}">
            {{{ Avatar }}}

            {{#unless editProfileMode}}
              <h1 class="profile__name">{{firstName}}</h1>
            {{/unless}}

          </div>

          {{#if editPasswordMode}}
            {{{ ChangePasswordForm }}}
          {{/if}}

          {{#if editProfileMode}}
            {{{ ChangeProfileForm }}}
          {{/if}}
          
          {{#if (neither editPasswordMode editProfileMode)}}
            {{{ ProfileFields }}}
            <div>
              {{{ ChangePasswordButton }}}
              {{{ ChangeDataButton }}}
              {{{ ExitButton }}}
            </div>
          {{/if}}
            
          {{{ Modal }}}
        </section>
      </section>
    `
  }
}
