import Block from '../../core/Block'

interface ButtonProps {
  events?: { click: () => void }
  onClick?: () => void
  filled?: boolean
  className?: string
  text: string
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: { click: props.onClick || (() => {}) },
    })
  }

  render() {
    return '<button class="button{{#if filled}} button_filled{{/if}} {{className}}">{{text}}</button>'
  }
}
