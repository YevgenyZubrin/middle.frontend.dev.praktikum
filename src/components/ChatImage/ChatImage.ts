import Block from '../../core/Block'

export default class ChatImage extends Block {
  constructor(props) {
    super({
      ...props,
    })
  }

  render() {
    return `
      {{#if imgUrl}}
        <img class="image {{className}}" src={{imgUrl}} alt="avatar">
      {{else}}
        <span class="image {{className}}"></span>
      {{/if}}
    `
  }
}
