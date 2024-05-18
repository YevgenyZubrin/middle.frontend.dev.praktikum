import { IProfile } from '../api/user'
import { UserValueType } from '../core/types'

const adaptUserToValidate = (form: UserValueType): IProfile => {
  const adaptedForm: AnyProps = {}
  Object.entries(form).forEach(([key, value]) => {
    if (key !== 'avatar' && key !== 'id') {
      adaptedForm[key] = value
    }
  })

  return adaptedForm as IProfile
}

export default adaptUserToValidate
