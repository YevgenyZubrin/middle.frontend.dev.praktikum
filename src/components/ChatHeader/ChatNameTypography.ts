import { connect } from '../../utils'
import { Typography } from '../Typography'

class ChatNameTypography extends Typography {}

export default connect(({ activeChat }) => ({ activeChat }))(ChatNameTypography)
