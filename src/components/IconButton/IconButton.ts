import Block from '../../core/Block'
import { Typography } from '../Typography'

export default class IconButton extends Block {
  constructor(props) {
    super({
      ...props,
      Text: new Typography({ text: props.text, className: 'icon-button__text' }),
      events: {
        click: props.onClick || (() => {}),
      },
    })
  }

  render() {
    return `
      <button class='icon-button {{className}}'>
        {{{ icon }}}

        {{#if text}}
          {{{ Text }}}
        {{/if}}
      </button>
    `
  }
}
