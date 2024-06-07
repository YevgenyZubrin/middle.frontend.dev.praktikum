import Block from '../../core/Block'
import BackIcon from '../Icons/BackIcon'
import Router from '../../core/Router'
import { BackLinkProps } from './interfaces'

export default class BackLink extends Block<BackLinkProps> {
  constructor(props: BackLinkProps) {
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
        <img src="/images/svg/back.svg" alt="назад">
      </div>
    `
  }
}
