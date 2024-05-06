import Block from '../../core/Block'
import BackIcon from '../Icons/BackIcon'
import Router from '../../core/Router'

interface BackIconProps {
  BackIcon?: BackIcon
  events?: { click: () => void }
}

export default class BackLink extends Block<BackIconProps> {
  constructor(props: BackIconProps) {
    super({
      ...props,
      events: {
        click: () => {
          Router.getInstance('#app').back()
        },
      },
      BackIcon: new BackIcon({}),
    })
  }

  render() {
    return `
      <div class="back-link">
        {{{ BackIcon }}}
      </div>
    `
  }
}
