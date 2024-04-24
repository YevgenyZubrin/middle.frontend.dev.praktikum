import Block from '../../core/Block'

export default class Button extends Block {
  constructor(props) {
    super({
      ...props,
      events: { click: props.onClick || (() => {}) },
    })
  }

  render() {
    return '<button class="button{{#if filled}} button_filled{{/if}} {{className}}">{{text}}</button>'
  }
}
