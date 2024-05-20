import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignInPasswordField extends Field {}

export default connect(({ signInForm }) => ({
  message: signInForm?.errors.password ?? '',
  value: signInForm?.values.password ?? '',
}))(SignInPasswordField)
