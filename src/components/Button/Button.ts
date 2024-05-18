import Block from '../../core/Block'
import { ButtonProps } from './interfaces'

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: { click: props.onClick || (() => {}) },
    })
  }

  render() {
    return `
      <button class="button{{#if filled}} button_filled{{/if}} {{className}}" {{#if isDisabled}}disabled{{/if}}>
        {{#if isLoading}}
          {{{ Spinner }}}
        {{else}}
          {{text}}
        {{/if}}
      </button>
      `
  }
}

export default Button
