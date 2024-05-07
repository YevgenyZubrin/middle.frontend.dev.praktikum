import Handlebars from 'handlebars'
import { ChangeAvatarModal } from '../ChangeAvatarModal'
import Block from '../../core/Block'
import { Button, BackLink, Avatar, Modal } from '..'
import { ProfileFields } from '../ProfileFields'
import { ChangeProfileForm } from '../ChangeProfileForm'
import { ChangePasswordForm } from '../ChangePasswordForm'
import { getName, getValidationResult } from '../../utils'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

interface ProfileProps {
  className?: string
  firstName?: string
  editPasswordMode?: boolean
  editProfileMode?: boolean
  ChangePasswordButton?: Button
  ChangeDataButton?: Button
  ExitButton?: Button
  BackLink?: BackLink
  Avatar?: Avatar
  Modal?: Modal
  ProfileFields?: ProfileFields
  ChangeProfileForm?: ChangeProfileForm
  ChangePasswordForm?: ChangePasswordForm
}

export default class Profile extends Block<ProfileProps> {
  constructor(props?: ProfileProps) {
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
        onSubmit: (e: Event): void => {
          const fields = this.children.ChangeProfileForm.children.ProfileFields.children
          this.onSubmitValidation(e, fields)
        },
      }),
      ChangePasswordForm: new ChangePasswordForm({
        onSubmit: (e: Event): void => {
          const fields = this.children.ChangePasswordForm.children
          this.onSubmitValidation(e, fields)
        },
      }),
    })
  }

  onSubmitValidation(e: Event, fields: Record<string, any>) {
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
      <section>
        <div class="profile">
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
        </div>
      </section>
    `
  }
}
