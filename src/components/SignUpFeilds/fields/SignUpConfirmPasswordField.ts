import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpConfirmPasswordField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.confirmPassword ?? '',
  value: signUpForm?.values.confirmPassword ?? '',
}))(SignUpConfirmPasswordField)
