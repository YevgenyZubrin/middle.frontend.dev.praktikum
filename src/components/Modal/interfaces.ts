import Block from '../../core/Block'

export interface ModalProps {
  overlayClassName?: string
  isOpen: boolean
  className?: string
  modalChildren: Block
  closeModal?: (e: Event) => void
  events?: {
    click: (e: Event) => void
  }
}
