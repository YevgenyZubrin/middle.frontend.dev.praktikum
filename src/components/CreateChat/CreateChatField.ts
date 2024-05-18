import { connect } from '../../utils'
import { Field } from '../Field'

class CreateChatField extends Field {}

export default connect(({ newChatName }) => ({ value: newChatName }))(CreateChatField)
