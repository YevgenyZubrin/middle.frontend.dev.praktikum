import Block from '../../core/Block'

export default class PlusIcon extends Block {
  render() {
    return `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="10" stroke="#3369F3" stroke-width="1.5"/>
        <line x1="11" y1="6" x2="11" y2="16" stroke="#3369F3" stroke-width="1.5"/>
        <line x1="6" y1="11" x2="16" y2="11" stroke="#3369F3" stroke-width="1.5"/>
      </svg>
    `
  }
}
