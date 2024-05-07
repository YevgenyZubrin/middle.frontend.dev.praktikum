import Block from '../../core/Block'
import { Login } from '../../components/Login'

export interface LoginPageProps {
  Login?: Login
}

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
