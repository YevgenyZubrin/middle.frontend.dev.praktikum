import Block from '../../core/Block'
import { IMessagesPerDay } from '../../core/types'
import { TypographyProps } from '../Typography/interfaces'

export interface MessagesPerDayProps {
  Date: Block<TypographyProps>
  messagesPerDayKeys: string[]
  date: string
  messagesPerDay: IMessagesPerDay[]
}
