import Block from '../../core/Block'

interface ModalProps {
  overlayClassName?: string
  isOpen: boolean
  className?: string
  modalChildren: Block
}

export default class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super({
      ...props,
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
