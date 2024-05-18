import { SignUp } from '../../components/SignUp'
import Block from '../../core/Block'
import { SignUpPageProps } from './interfaces'

class SignUpPage extends Block<SignUpPageProps> {
  constructor(props?: SignUpPageProps) {
    super({ ...props, SignUp: new SignUp({}) })
  }

  render() {
    return `
      <div>
        {{{ SignUp }}}
      </div>
    `
  }
}

export default SignUpPage
