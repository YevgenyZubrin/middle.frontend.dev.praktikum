import Handlebars from 'handlebars'
import { ChangeAvatarModal } from '../ChangeAvatarModal'
import Block from '../../core/Block'
import { Button, BackLink, Avatar, Modal } from '..'
import { ProfileFields } from '../ProfileFields'
import { connect } from '../../utils'
import { getUserInfo, logout } from '../../controller/auth'
import { ProfileInfo } from '../ProfileInfo'
import { changeAvatar } from '../../controller/user'
import Router from '../../core/Router'
import { ChangePassword } from '../ChangePassword'
import { ChangeProfile } from '../ChangeProfile'
import { ProfileProps } from './interfaces'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

const router = Router.getInstance('#app')

class Profile extends Block<ProfileProps> {
  constructor(props?: ProfileProps) {
    super({
      ...props,
      ChangePasswordButton: new Button({
        className: 'profile__button',
        text: 'Изменить пароль',
        onClick: () => {
          this.props.setIsPasswordChange(true)
        },
      }),
      ChangeDataButton: new Button({
        className: 'profile__button',
        text: 'Изменить данные',
        onClick: () => {
          this.props.setIsProfileChange(true)
        },
      }),
      ExitButton: new Button({
        className: 'profile__button profile__button_red',
        text: 'Выйти',
        onClick: () => {
          logout()
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
        closeModal: (e: Event) => {
          if (e.target instanceof HTMLElement && e.target?.classList.value.match('modal__overlay')) {
            this.children.Modal.setProps({ isOpen: false })
          }
        },
        modalChildren: new ChangeAvatarModal({
          choosedFileName: '',
          isFileLoadError: false,
          onSubmit: (e: Event) => {
            e.preventDefault()
            if (this.props.avatarFileName && e.target instanceof HTMLFormElement) {
              const formData = new FormData(e.target)
              changeAvatar(formData)
              e.target.reset()
            } else {
              this.props.setIsChooseFileErrore(true)
            }
          },
        }),
        className: 'profile__modal',
      }),
      ProfileFields: new ProfileFields({}),
      ChangeProfile: new ChangeProfile({}),
      ChangePassword: new ChangePassword({}),
      ProfileInfo: new ProfileInfo({}),
    })
  }

  init(): void {
    const checkIsSignedIn = async () => {
      if (!(await getUserInfo())) {
        router.go('/')
      }
    }
    checkIsSignedIn()
  }

  render() {
    return `
      <section>
        <div class="profile">
          {{{ BackLink }}}
          <section class="profile__container">
            <div class="profile__avatar-wrapper {{className}}">
              {{{ Avatar }}}

              {{#unless isProfileChange}}
                <h1 class="profile__name">{{user.values.first_name}}</h1>
              {{/unless}}

            </div>

            {{#if isPasswordChange}}
              {{{ ChangePassword }}}

              {{#if changePasswordError}}
                <p class='profile__error'>
                  {{changePasswordError}}
                </p>
              {{/if}}
            {{/if}}

            {{#if isProfileChange}}
              {{{ ChangeProfile }}}

              {{#if changeProfileError}}
                <p class='profile__error'>
                  {{changeProfileError}}
                </p>
              {{/if}}
            {{/if}}
              
            {{#if (neither isPasswordChange isProfileChange)}}
              {{{ ProfileInfo }}}

              <div>
                {{{ ChangePasswordButton }}}
                {{{ ChangeDataButton }}}
                {{{ ExitButton }}}
              </div>
            {{/if}}
              
            {{#if isLoading}}
              <p class='profile__loading'>
                Загрузка...
              </p>
            {{/if}}
            {{{ Modal }}}
          </section>
        </div>
      </section>
    `
  }
}

export default connect(
  ({ isLoading, isProfileChange, isPasswordChange, avatarFileName, changeProfileError, changePasswordError }) => ({
    isLoading,
    isProfileChange,
    isPasswordChange,
    avatarFileName,
    changeProfileError,
    changePasswordError,
  }),
  {
    setIsProfileChange: (dispatch, value) => dispatch({ isProfileChange: value }),
    setIsPasswordChange: (dispatch, value) => dispatch({ isPasswordChange: value }),
    setIsChooseFileErrore: (dispatch, value) => dispatch({ isChooseFileError: value }),
  },
)(Profile)
