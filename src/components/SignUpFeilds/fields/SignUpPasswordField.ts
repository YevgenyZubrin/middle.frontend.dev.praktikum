import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpPasswordField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.password ?? '',
  value: signUpForm?.values.password ?? '',
}))(SignUpPasswordField)
