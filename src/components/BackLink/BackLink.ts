import Block from '../../core/Block'

export default class BackLink extends Block {
  render() {
    return `
      <a class="back-link" href="/">
        <img src="/src/public/images/svg/back.svg" alt="назад">
      </a>
    `
  }
}
