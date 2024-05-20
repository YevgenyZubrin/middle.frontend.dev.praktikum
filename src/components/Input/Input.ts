import Block from '../../core/Block'
import { InputProps } from './interfaces'

class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur || (() => {}),
        change: props.onChange || (() => {}),
      },
    })
  }

  render() {
    return `
      <input 
        class='{{className}}'
        id='{{id}}' 
        name='{{id}}' 
        type='{{type}}' 
        value='{{value}}'
        {{#if disabled}}disabled{{/if}} 
        {{#if placeholder}}placeholder={{placeholder}}{{/if}}
      />
    `
  }
}

export default Input
