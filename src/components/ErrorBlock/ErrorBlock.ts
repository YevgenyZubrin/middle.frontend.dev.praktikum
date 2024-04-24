// @ts-nocheck

import Block from '../../core/Block'

export default class Profile extends Block {
  constructor(props) {
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
