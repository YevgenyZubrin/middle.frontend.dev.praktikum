import Block from '../../core/Block'
import { Button } from '../Button'

export default class ChangeAvatarModal extends Block {
  constructor(props) {
    super({
      ...props,
      ChoosePictureButton: new Button({
        text: 'Выбрать файл на компьютере',
        className: 'change-avatar__choose-file-button',
        onClick: () => {
          this.setProps({ choosedFileName: 'pic.jpg' })
        },
      }),
      ChangePictureButton: new Button({
        text: 'Поменять',
        filled: true,
        className: 'change-avatar__change-button',
        onClick: () => {
          if (!this.props.choosedFileName) {
            this.setProps({ isChooseFileError: true })
          } else {
            this.setProps({ isFileLoadError: true })
          }
        },
      }),
    })
  }

  render() {
    return `
      <div class="change-avatar">

        {{#if isFileLoadError}}
          <h2 class="change-avatar__title change-avatar__title_error">Ошибка, попробуйте ещё раз</h2>
        {{else}}
          <h2 class="change-avatar__title">Загрузите файл</h2>
        {{/if}}

        {{#if choosedFileName}}
          <p class="change-avatar__image-name">{{choosedFileName}}</p>
        {{else}}
          {{{ ChoosePictureButton }}}
        {{/if}}

        {{{ ChangePictureButton }}}

        {{{ Button }}}

        {{#if isChooseFileError}}
          <p class="change-avatar__error-message">Нужно выбрать файл</p>
        {{/if}}
      </div>
    `
  }
}