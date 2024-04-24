import Block from '../../core/Block'
import { getComponentsList } from '../../utils'
import { FileIcon, LocationIcon, MediaIcon } from '../Icons'
import { IconButton } from '../IconButton'

export default class FileTypeMenu extends Block {
  constructor(props) {
    const fileTypeList = [
      {
        text: 'Фото или Видео',
        icon: new MediaIcon({}),
        className: 'file-type-menu__button',
      },
      {
        text: 'Файл',
        icon: new FileIcon({}),
        className: 'file-type-menu__button',
      },
      {
        text: 'Локация',
        icon: new LocationIcon({}),
        className: 'file-type-menu__button',
      },
    ]

    const buttonList = getComponentsList(
      fileTypeList,
      IconButton,
    )

    super({
      ...props,
      buttonListKey: Object.keys(buttonList),
      ...buttonList,
    })
  }

  render() {
    return `
      <div class="file-type-menu__list">
        ${this.props.buttonListKey.map((key) => `{{{ ${key} }}}`).join('')}
      </div>  
    `
  }
}