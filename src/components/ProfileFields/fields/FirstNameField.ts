import { connect } from '../../../utils'
import { Field } from '../../Field'

class FirstNameField extends Field {}

export default connect(({ user }) => ({
  value: user?.values.first_name ?? '',
  message: user?.errors.first_name ?? '',
}))(FirstNameField)
