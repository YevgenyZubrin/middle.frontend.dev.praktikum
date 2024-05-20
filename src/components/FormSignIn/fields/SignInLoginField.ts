import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignInLoginField extends Field {}

export default connect(({ signInForm }) => ({
  message: signInForm?.errors.login ?? '',
  value: signInForm?.values.login ?? '',
}))(SignInLoginField)
