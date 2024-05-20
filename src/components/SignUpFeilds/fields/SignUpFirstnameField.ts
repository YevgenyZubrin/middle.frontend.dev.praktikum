import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpFirstnameField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.first_name ?? '',
  value: signUpForm?.values.first_name ?? '',
}))(SignUpFirstnameField)
