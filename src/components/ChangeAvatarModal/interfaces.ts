import Block from '../../core/Block'
import { ButtonProps } from '../Button/interfaces'
import { ChooseAvatarInputProps } from '../ChooseAvatarInput/interfaces'

export interface ChangeAvatarModalProps {
  isFileLoadError: boolean
  choosedFileName: string
  isChooseFileError: boolean
  ChangePictureButton?: Block<ButtonProps>
  ChooseAvatarInput?: Block<ChooseAvatarInputProps>
  events?: {
    submit: (e: Event) => void
    change: (e: Event) => void
  }
  onSubmit?: (e: Event) => void
  onChange?: (e: Event) => void
}
