import Block from '../../core/Block'
import { Login } from '../../components/Login'
import { LoginPageProps } from './interfaces'

class LoginPage extends Block<LoginPageProps> {
  constructor(props?: LoginPageProps) {
    super({ ...props, Login: new Login({}) })
  }

  render() {
    return `
      <div>
        {{{ Login }}}
      </div>
    `
  }
}

export default LoginPage
