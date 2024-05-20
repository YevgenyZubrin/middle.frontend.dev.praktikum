import Block from '../../core/Block'
import { ChatImageProps } from './interfaces'

export default class ChatImage extends Block<ChatImageProps> {
  constructor(props: ChatImageProps) {
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
