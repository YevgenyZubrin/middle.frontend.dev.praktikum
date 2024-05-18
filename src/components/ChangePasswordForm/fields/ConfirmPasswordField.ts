import { connect } from '../../../utils'
import { Field } from '../../Field'

class ConfirmPasswordField extends Field {}

export default connect(({ passwordForm }) => ({
  message: passwordForm?.errors.confirmPassword ?? '',
  value: passwordForm?.values.confirmPassword ?? '',
}))(ConfirmPasswordField)
