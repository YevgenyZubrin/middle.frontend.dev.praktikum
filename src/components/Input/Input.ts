import Block from '../../core/Block'

interface InputProps {
  className?: string
  id: string
  type: string
  disabled?: boolean
  placeholder?: string
  events?: { blur: (e: Event) => void }
  onBlur?: (e: Event) => void
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur || (() => {}),
      },
    })
  }

  render() {
    return `
      <input 
        class={{className}}
        id={{id}} 
        name={{id}} 
        type={{type}} 
        {{#if disabled}}disabled{{/if}} 
        {{#if placeholder}}placeholder={{placeholder}}{{/if}}  
      />
    `
  }
}
