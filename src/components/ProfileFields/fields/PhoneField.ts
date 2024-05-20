import { connect } from '../../../utils'
import { Field } from '../../Field'

class PhoneField extends Field {}

export default connect(({ user }) => ({ value: user?.values.phone ?? '', message: user?.errors.phone ?? '' }))(
  PhoneField,
)
