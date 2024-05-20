import Block from '../../core/Block'
import { FileTypeMenu } from '../FileTypeMenu'
import { FormMessageProps } from '../FormMessage/interfaces'
import { IconButton } from '../IconButton'

export interface ChatFooterProps {
  isShareMenuOpened?: boolean
  ShareFileButton?: IconButton
  FileTypeMenu?: FileTypeMenu
  FormMessage?: Block<FormMessageProps>
}
