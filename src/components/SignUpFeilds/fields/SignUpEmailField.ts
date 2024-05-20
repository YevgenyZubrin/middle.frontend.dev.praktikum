import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpEmailField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.email ?? '',
  value: signUpForm?.values.email ?? '',
}))(SignUpEmailField)
