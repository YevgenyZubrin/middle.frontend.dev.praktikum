import Block from '../../core/Block'
import { connect } from '../../utils'
import { Button } from '../Button'
import { ChooseAvatarInput } from '../ChooseAvatarInput'
import { ChangeAvatarModalProps } from './interfaces'

class ChangeAvatarModal extends Block<ChangeAvatarModalProps> {
  constructor(props: ChangeAvatarModalProps) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
        change: props.onChange || (() => {}),
      },
      ChooseAvatarInput: new ChooseAvatarInput({
        className: 'change-avatar__choose-file-button',
        onChange: (e: Event) => {
          if (e.target && e.target instanceof HTMLInputElement) {
            const { files } = e.target

            if (files && files.length > 0) {
              this.props.setChoosedFileName(files[0].name)
            }
          }
          this.props.setIsChooseFileErrore(false)
        },
      }),
      ChangePictureButton: new Button({
        text: 'Поменять',
        filled: true,
        className: 'change-avatar__change-button',
      }),
    })
  }

  render() {
    return `
      <form class="change-avatar">  
        {{#if isChangeAvatarError}}
          <h2 class="change-avatar__title change-avatar__title_error">Ошибка, попробуйте ещё раз</h2>
        {{else}}
          <h2 class="change-avatar__title">Загрузите файл</h2>
        {{/if}}

          {{{ ChooseAvatarInput }}}

          {{#if avatarFileName}}
            <label class='change-avatar__choose-file-button_file-choosed' for='avatar'>
              {{avatarFileName}}
            </label>
          {{else}}
            <label class='change-avatar__choose-file-button' for='avatar'>
              Выбрать файл на компьютере
            </label>
          {{/if}}
        
        {{{ ChangePictureButton }}}

        {{{ Button }}}

        {{#if isChooseFileError}}
          <p class="change-avatar__error-message">Нужно выбрать файл</p>
        {{/if}}

        {{#if isLoading}}
          Загрузка...
        {{/if}}
      </form>
    `
  }
}

export default connect(
  ({ avatarFileName, isChooseFileError, isChangeAvatarError, isLoading }) => ({
    avatarFileName,
    isChooseFileError,
    isChangeAvatarError,
    isLoading,
  }),
  {
    setChoosedFileName: (dispatch, value) => dispatch({ avatarFileName: value }),
    setIsChooseFileErrore: (dispatch, value) => dispatch({ isChooseFileError: value }),
  },
)(ChangeAvatarModal)
