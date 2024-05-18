import Block from '../../core/Block'
import { AvatarProps } from '../Avatar/interfaces'
import { BackLinkProps } from '../BackLink/interfaces'
import { ButtonProps } from '../Button/interfaces'
import { ChangePasswordProps } from '../ChangePassword/interfaces'
import { ChangeProfileProps } from '../ChangeProfile/interfaces'
import { ModalProps } from '../Modal/interfaces'
import { ProfileFieldsProps } from '../ProfileFields/interfaces'

export interface ProfileProps {
  className?: string
  firstName?: string
  editPasswordMode?: boolean
  editProfileMode?: boolean
  ChangePasswordButton?: Block<ButtonProps>
  ChangeDataButton?: Block<ButtonProps>
  ExitButton?: Block<ButtonProps>
  BackLink?: Block<BackLinkProps>
  Avatar?: Block<AvatarProps>
  Modal?: Block<ModalProps>
  ProfileFields?: Block<ProfileFieldsProps>
  ChangeProfile?: Block<ChangeProfileProps>
  ChangePassword?: Block<ChangePasswordProps>
  ProfileInfo?: Block
}
