import { connect } from '../../../utils'
import { Field } from '../../Field'

class DisplayNameField extends Field {}

export default connect(({ user }) => ({
  value: user?.values.display_name ?? '',
  message: user?.errors.display_name ?? '',
}))(DisplayNameField)
