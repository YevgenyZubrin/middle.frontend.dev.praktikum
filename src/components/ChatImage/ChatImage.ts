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
      {{#if avatar}}
        <img class="image {{className}}" src={{avatar}} alt="avatar">
      {{else}}
        <span class="image image_empty {{className}}"></span>
      {{/if}}
    `
  }
}
