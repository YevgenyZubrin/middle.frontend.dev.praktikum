// @ts-nocheck

import Handlebars from 'handlebars'
import { ChangeAvatarModal } from '../../components/ChangeAvatarModal'
import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import {
  Field,
  Button,
  BackLink,
  Avatar,
  Modal,
} from '../../components'

Handlebars.registerHelper('or', (...args) => {
  // Последний элемент в args — это объект options, его нужно исключить
  const options = args.pop()
  return args.some(Boolean)
})

export default class Profile extends Block {
  constructor(props) {
    const profileFieldComponents = getComponentsList(
      props.profileFields,
      Field,
      {
        onBlur: (e) => {
          console.log('blur', e.target.value)
        },
      },
    )

    const changePassworlFieldComponents = getComponentsList(
      props.changePasswordFields,
      Field,
      {
        onBlur: (e) => {
          console.log('blur', e.target.value)
        },
      },
    )

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
      SaveButton: new Button({
        filled: true,
        text: 'Сохранить',
        className: 'profile__save-button',
        onClick: () => {
          this.setProps({
            editProfileMode: false,
            editPasswordMode: false,
          })
        },
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
      profileFieldComponentsKeys: Object.keys(profileFieldComponents),
      changePassworlFieldComponentsKeys: Object.keys(changePassworlFieldComponents),
      ...changePassworlFieldComponents,
      ...profileFieldComponents,
    })
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

          <form>
            {{#if editPasswordMode}}
              ${this.props.changePassworlFieldComponentsKeys.map((key) => `{{{ ${key} }}}`).join('')}
            {{else}}
              ${this.props.profileFieldComponentsKeys.map((key) => `{{{ ${key} }}}`).join('')}
            {{/if}}
          </form>

          
          {{#if (or editPasswordMode editProfileMode)}}
            <div class="profile__button-wrapper">
              {{{ SaveButton }}}
            </div>
          {{else}}
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
