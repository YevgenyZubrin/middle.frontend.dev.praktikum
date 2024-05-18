import Block from '../../core/Block'
import { TypographyProps } from './interfaces'

export default class Typography extends Block<TypographyProps> {
  constructor(props: TypographyProps) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <p class="typography {{className}}">{{text}}</p>
    `
  }
}
