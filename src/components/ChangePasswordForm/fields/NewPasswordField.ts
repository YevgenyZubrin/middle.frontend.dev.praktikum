import { connect } from '../../../utils'
import { Field } from '../../Field'

class NewPasswordField extends Field {}

export default connect(({ passwordForm }) => ({
  message: passwordForm?.errors.newPassword ?? '',
  value: passwordForm?.values.newPassword ?? '',
}))(NewPasswordField)
