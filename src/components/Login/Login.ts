import Block from '../../core/Block'
import { Button } from '..'
import { FormSignIn } from '../FormSignIn'
import { connect, getValidationResult, isEmptyObjValues } from '../../utils'
import { getUserInfo, signin } from '../../controller/auth'
import Router from '../../core/Router'
import { LoginProps } from './interfaces'
import { SignInFormType } from '../../core/types'

const router = Router.getInstance('#app')

class Login extends Block<LoginProps> {
  constructor(props?: LoginProps) {
    super({
      ...props,
      AddAccountButton: new Button({
        filled: false,
        text: 'Нет аккаунта?',
        onClick: () => {
          router.go('/sign-up')
        },
      }),
      FormSignIn: new FormSignIn({
        onSubmit: (e: Event) => {
          this.onSubmitValidation(e, this.props.signInForm)
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

  onSubmitValidation(e: Event, form: SignInFormType) {
    e.preventDefault()

    const validationResult = getValidationResult(form.values)

    if (isEmptyObjValues(validationResult)) {
      this.setProps({
        editProfileMode: false,
        editPasswordMode: false,
      })
      signin(form.values)
    } else {
      this.props.setForm(
        {
          errors: { ...form.errors, ...validationResult },
          values: { ...form.values },
        },
        'signInForm',
      )
    }
  }

  render() {
    return `
      <section class="login">
        <section class="login__container">
          <h1 class="login__title">Вход</h1>

          {{{ FormSignIn }}}

          <div class="login__button-wrapper">
            {{{ AddAccountButton }}}
          </div>
        </section>
        {{#if isLoading}}
          Загрузка...
        {{/if}}
        {{#if loginError}}
          <p class='login__error'>
            {{loginError}}
          </p>
        {{/if}}
      </section>`
  }
}

export default connect(
  ({ isLoading, signUpForm, signInForm, loginError }) => ({ isLoading, signUpForm, signInForm, loginError }),
  {
    setForm: (dispatch, value, formName) => dispatch({ [formName]: value }),
  },
)(Login)
