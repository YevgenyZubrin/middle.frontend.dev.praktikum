import { connect } from '../../../utils'
import { Field } from '../../Field'

class SecondNameField extends Field {}

export default connect(({ user }) => ({
  value: user?.values.second_name ?? '',
  message: user?.errors.second_name ?? '',
}))(SecondNameField)
