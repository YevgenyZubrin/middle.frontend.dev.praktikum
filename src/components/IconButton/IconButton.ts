import Block from '../../core/Block'
import { Typography } from '../Typography'
import { IconButtonProps } from './interfaces'

export default class IconButton extends Block<IconButtonProps> {
  constructor(props: IconButtonProps) {
    super({
      ...props,
      Text: new Typography({ text: props?.text ?? '', className: 'icon-button__text' }),
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
