import Block from '../../core/Block'
import { ModalProps } from './interfaces'

export default class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        click: props.closeModal || (() => {}),
      },
    })
  }

  render() {
    return `
      <div class="modal modal__overlay {{overlayClassName}}{{#if isOpen}} modal__overlay_open{{/if}}">
        <div class="modal__content {{className}}">
          {{{ modalChildren}}}
        </div>
      </div>
    `
  }
}
