import Block from '../../core/Block'
import { ErrorBlockProps } from './interfaces'

export default class ErrorBlock extends Block<ErrorBlockProps> {
  constructor(props: ErrorBlockProps) {
    super({
      ...props,
    })
  }

  render() {
    return `
    <div class="error-block">
      <h2 class="error-block__title">{{errorCode}}</h2>
      <p class="error-block__description">{{errorDescription}}</p>
      <a class="error-block__back-link" href="/">{{backLinkText}}</a>
    </div>
    `
  }
}
