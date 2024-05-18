import { connect } from '../../../utils'
import { Field } from '../../Field'

class LoginField extends Field {}

export default connect(({ user }) => ({ value: user?.values.login ?? '', message: user?.errors.login ?? '' }))(
  LoginField,
)
