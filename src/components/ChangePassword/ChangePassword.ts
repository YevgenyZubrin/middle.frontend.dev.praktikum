import Handlebars from 'handlebars'
import Block from '../../core/Block'
import { ChangePasswordForm } from '../ChangePasswordForm'
import { connect, getValidationResult, isEmptyObjValues } from '../../utils'
import { getUserInfo } from '../../controller/auth'
import { changePassword } from '../../controller/user'
import Router from '../../core/Router'
import { PasswordFormType, PasswordFormValuesType } from '../../core/types'
import { ChangePasswordProps } from './interfaces'

Handlebars.registerHelper('neither', (a, b) => !a && !b)

const router = Router.getInstance('#app')

class ChangePassword extends Block<ChangePasswordProps> {
  constructor(props?: ChangePasswordProps) {
    super({
      ...props,
      ChangePasswordForm: new ChangePasswordForm({
        onSubmit: (e: Event): void => {
          this.onSubmitValidation(e, this.props.passwordForm)
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

  onSubmitValidation(e: Event, form: PasswordFormType) {
    e.preventDefault()

    const changePasswordHandle = async (passwordForm: PasswordFormValuesType) => {
      if (await changePassword(passwordForm)) {
        this.props.setIsPasswordChange(false)
      }
    }

    const validationResult = getValidationResult(form.values)
    const { newPassword, confirmPassword } = form.values

    if (newPassword !== confirmPassword) {
      validationResult.confirmPassword = 'Пароли не совпадают'
    }

    if (isEmptyObjValues(validationResult)) {
      changePasswordHandle(form.values)
    } else {
      this.props.setForm(
        {
          errors: { ...form.errors, ...validationResult },
          values: { ...form.values },
        },
        'passwordForm',
      )
    }
  }

  render() {
    return `
      <section>
        {{{ ChangePasswordForm }}}
      </section>
    `
  }
}

export default connect(({ passwordForm }) => ({ passwordForm }), {
  setIsPasswordChange: (dispatch, value) => dispatch({ isPasswordChange: value }),
  setForm: (dispatch, value, formName) => dispatch({ [formName]: value }),
})(ChangePassword)
