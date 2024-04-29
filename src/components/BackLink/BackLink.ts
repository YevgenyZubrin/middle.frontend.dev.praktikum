import Block from '../../core/Block'
import BackIcon from '../Icons/BackIcon'

interface BackIconProps {
  BackIcon?: BackIcon
}

export default class BackLink extends Block<BackIconProps> {
  constructor(props: BackIconProps) {
    super({ ...props, BackIcon: new BackIcon({}) })
  }

  render() {
    return `
      <a class="back-link" href="/">
        {{{ BackIcon }}}
      </a>
    `
  }
}
