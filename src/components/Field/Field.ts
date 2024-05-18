import { Input } from '../Input'
import Block from '../../core/Block'
import { isEqual } from '../../utils'
import { FieldProps } from './interfaces'

class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super({
      ...props,
      Input: new Input({
        ...props,
        className: 'field__input',
        events: {
          change: props.onChange || (() => {}),
          blur: props.onBlur || (() => {}),
        },
      }),
      ProfileInput: new Input({
        ...props,
        className: 'field__input_profile',
        events: {
          change: props.onChange || (() => {}),
          blur: props.onBlur || (() => {}),
        },
      }),
    })
  }

  componentDidUpdate(oldProps: AnyProps, newProps: AnyProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      if (this.props.isProfile) {
        this.children.ProfileInput.setProps({ value: newProps.value })
      } else {
        this.children.Input.setProps({ value: newProps.value })
      }
    }
    return true
  }

  render() {
    return `
      <div class="field {{className}}">
        <label class="field__label{{#if isProfile}} field__label_profile{{/if}}" for={{id}}>
          {{labelText}}
        </label>
        {{#if isProfile}} 
          {{{ ProfileInput }}}
        {{else}}
          {{{ Input }}}
        {{/if}}
        {{#if message}}
          <p class="field__message error">{{message}}</p>
        {{/if}}
      </div>
    `
  }
}

export default Field
