import { FileIcon, LocationIcon, MediaIcon } from '../Icons'

export interface FileTypeList {
  text: string
  icon: MediaIcon | FileIcon | LocationIcon
  className: string
}
