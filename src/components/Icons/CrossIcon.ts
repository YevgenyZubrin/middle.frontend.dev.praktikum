import Block from '../../core/Block'

export default class CrossIcon extends Block {
  constructor(props) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="10" stroke="#3369F3" stroke-width="1.5"/>
        <line transform="rotate(45 11 11)" x1="11" y1="6" x2="11" y2="16" stroke="#3369F3" stroke-width="1.5"/>
        <line transform="rotate(135 11 11)" x1="11" y1="6" x2="11" y2="16" stroke="#3369F3" stroke-width="1.5"/>
      </svg>
    `
  }
}