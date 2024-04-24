import Block from '../../core/Block'

export default class Modal extends Block {
  constructor(props) {
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
