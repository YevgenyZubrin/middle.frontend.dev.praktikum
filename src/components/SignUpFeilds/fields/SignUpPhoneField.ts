import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpPhoneField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.phone ?? '',
  value: signUpForm?.values.phone ?? '',
}))(SignUpPhoneField)
