import { connect } from '../../utils'
import { Field } from '../Field'

class AddDeleteLoginField extends Field {}

export default connect(({ addOrDeleteUserForm }) => ({
  message: addOrDeleteUserForm?.errors.login ?? '',
  value: addOrDeleteUserForm?.values.login ?? '',
}))(AddDeleteLoginField)
