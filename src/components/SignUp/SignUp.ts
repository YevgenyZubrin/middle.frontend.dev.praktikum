import Block from '../../core/Block'
import { Button } from '..'
import { FormSignUp } from '../FormSignUp'
import { connect, getValidationResult, isEmptyObjValues } from '../../utils'
import { getUserInfo, signup } from '../../controller/auth'
import Router from '../../core/Router'
import { SignUpFormType } from '../../core/types'
import { SignUpProps } from './interfaces'

const router = Router.getInstance('#app')

class SignUp extends Block<SignUpProps> {
  constructor(props?: SignUpProps) {
    super({
      ...props,
      SignInButton: new Button({
        filled: false,
        text: 'Войти',
        onClick: () => {
          router.go('/')
        },
      }),
      FormSignUp: new FormSignUp({
        onSubmit: (e: Event) => {
          this.onSubmitValidation(e, this.props.signUpForm)
        },
      }),
    })
  }

  init(): void {
    const checkIsSignedIn = async () => {
      if (await getUserInfo()) {
        router.go('/messenger')
      }
    }
    checkIsSignedIn()
  }

  onSubmitValidation(e: Event, form: SignUpFormType) {
    e.preventDefault()

    const validationResult = getValidationResult(form.values)
    const { password, confirmPassword } = form.values

    if (password !== confirmPassword) {
      validationResult.confirmPassword = 'Пароли не совпадают'
    }

    if (isEmptyObjValues(validationResult)) {
      this.setProps({
        editProfileMode: false,
        editPasswordMode: false,
      })
      signup(form.values)
    } else {
      this.props.setForm(
        {
          errors: { ...form.errors, ...validationResult },
          values: { ...form.values },
        },
        'signUpForm',
      )
    }
  }

  render() {
    return `
      <section class='login'>
        <section class='login__container'>
          <h1 class='login__title'>Регистрация</h1>
          
          {{{ FormSignUp }}}

          <div class='login__button-wrapper'>
            {{{ SignInButton }}}
          </div>
        </section>
        {{#if isLoading}}
          Загрузка...
        {{/if}}
        {{#if signUpError}}
          <p class='login__error'>
            {{signUpError}}
          </p>
        {{/if}}
      </section>`
  }
}

export default connect(({ isLoading, signUpForm, signUpError }) => ({ isLoading, signUpForm, signUpError }), {
  setForm: (dispatch, value, formName) => dispatch({ [formName]: value }),
})(SignUp)
