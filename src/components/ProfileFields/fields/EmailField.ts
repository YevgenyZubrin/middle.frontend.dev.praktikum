import { connect } from '../../../utils'
import { Field } from '../../Field'

class EmailField extends Field {}

export default connect(({ user }) => ({ value: user?.values.email ?? '', message: user?.errors.email ?? '' }))(
  EmailField,
)
