import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpLoginField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.login ?? '',
  value: signUpForm?.values.login ?? '',
}))(SignUpLoginField)
