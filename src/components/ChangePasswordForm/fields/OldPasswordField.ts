import { connect } from '../../../utils'
import { Field } from '../../Field'

class OldPasswordField extends Field {}

export default connect(({ passwordForm }) => ({
  message: passwordForm?.errors.oldPassword ?? '',
  value: passwordForm?.values.oldPassword ?? '',
}))(OldPasswordField)
