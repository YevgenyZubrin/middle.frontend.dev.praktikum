import Block from '../../core/Block'

interface ErrorBlockProps {
  errorCode: string
  errorDescription: string
  backLinkText: string
}

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
