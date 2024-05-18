import Handlebars from 'handlebars'
import Block from '../../core/Block'
import { ChangeProfileForm } from '../ChangeProfileForm'
import { connect, getValidationResult, isEmptyObjValues } from '../../utils'
import { getUserInfo } from '../../controller/auth'
import { changeProfile } from '../../controller/user'
import adaptUserToValidate from '../../utils/adaptUserToValidate'
import Router from '../../core/Router'
import { UserType } from '../../core/types'
import { ChangeProfileProps } from './interfaces'
import { IProfile } from '../../api/user'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

const router = Router.getInstance('#app')

class ChangeProfile extends Block<ChangeProfileProps> {
  constructor(props?: ChangeProfileProps) {
    super({
      ...props,
      ChangeProfileForm: new ChangeProfileForm({
        onSubmit: (e: Event): void => {
          this.onSubmitValidation(e, this.props.user)
        },
      }),
    })
  }

  init(): void {
    const checkIsSignedIn = async () => {
      if (!(await getUserInfo())) {
        router.go('/')
      }
    }
    checkIsSignedIn()
  }

  onSubmitValidation(e: Event, form: UserType) {
    e.preventDefault()

    const changeProfileHandle = async (profileForm: IProfile) => {
      const isProfileChanged = await changeProfile(profileForm)
      if (isProfileChanged) {
        this.props.setIsProfileChange(false)
      }
    }

    const adaptedFormValues = adaptUserToValidate(form.values)

    const validationResult = getValidationResult(adaptedFormValues)

    if (isEmptyObjValues(validationResult)) {
      changeProfileHandle(adaptedFormValues)
    } else {
      this.props.setForm(
        {
          errors: { ...form.errors, ...validationResult },
          values: { ...form.values },
        },
        'user',
      )
    }
  }

  render() {
    return `
      <section>
        {{{ ChangeProfileForm }}}
      </section>
    `
  }
}

export default connect(({ user }) => ({ user }), {
  setIsProfileChange: (dispatch, value) => dispatch({ isProfileChange: value }),
  setForm: (dispatch, value, formName) => dispatch({ [formName]: value }),
})(ChangeProfile)
