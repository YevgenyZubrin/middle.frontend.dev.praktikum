import Block from '../../core/Block'

export default class Input extends Block {
  constructor(props) {
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
