import { connect } from '../../../utils'
import { Field } from '../../Field'

class SignUpSecondnameField extends Field {}

export default connect(({ signUpForm }) => ({
  message: signUpForm?.errors.second_name ?? '',
  value: signUpForm?.values.second_name ?? '',
}))(SignUpSecondnameField)
