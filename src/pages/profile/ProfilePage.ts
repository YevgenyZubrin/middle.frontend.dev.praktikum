import Handlebars from 'handlebars'
import Block from '../../core/Block'
import { Profile } from '../../components/Profile'
import { ProfilePageProps } from './interfaces'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

export default class ProfilePage extends Block<ProfilePageProps> {
  constructor(props?: ProfilePageProps) {
    super({
      ...props,
      Profile: new Profile({}),
    })
  }

  render() {
    return `
      <div>
        {{{ Profile }}}
      </div>
    `
  }
}
