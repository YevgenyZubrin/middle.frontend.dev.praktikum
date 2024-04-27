import Block from '../../core/Block'
import { validate } from '../../utils'
import getName from '../../utils/getName'
import { Field } from '../Field'

export default class ProfileFields extends Block {
  constructor(props) {
    super({
      ...props,
      EmailField: new Field({
        onBlur: (e) => {
          this.validate('email', e.target.value)
        },
        id: 'email',
        labelText: 'Почта',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
      LoginField: new Field({
        onBlur: (e) => {
          this.validate('login', e.target.value)
        },
        id: 'login',
        labelText: 'Логин',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
      FirstNameField: new Field({
        onBlur: (e) => {
          this.validate('first_name', e.target.value)
        },
        id: 'first_name',
        labelText: 'Имя',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
      SecondNameField: new Field({
        onBlur: (e) => {
          this.validate('second_name', e.target.value)
        },
        id: 'second_name',
        labelText: 'Фамилия',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
      DisplayNameField: new Field({
        onBlur: (e) => {
          this.validate('display_name', e.target.value)
        },
        id: 'display_name',
        labelText: 'Имя в чате',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
      PhoneField: new Field({
        onBlur: (e) => {
          this.validate('phone', e.target.value)
        },
        id: 'phone',
        labelText: 'Телефон',
        type: 'text',
        disabled: false,
        isProfile: true,
      }),
    })
  }

  validate(fieldName, value) {
    console.log(this.children)
    const componentName = getName(this.children, fieldName)

    if (this.props.editProfileMode) {
      const errorText = validate(fieldName, value)
      if (errorText) {
        this.children[componentName].setProps({
          message: {
            text: errorText,
            type: 'error',
          },
        })
      } else {
        this.children[componentName].setProps({
          message: {},
        })
      }
    }
  }

  render() {
    return `
      <div>
        {{{ EmailField }}}
        {{{ LoginField }}}
        {{{ FirstNameField }}}
        {{{ SecondNameField }}}
        {{{ DisplayNameField }}}
        {{{ PhoneField }}}
      </div>
    `
  }
}
