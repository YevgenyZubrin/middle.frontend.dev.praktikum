import { Input } from '../Input'
import Block from '../../core/Block'

interface FieldProps {
  isProfile?: boolean
  className?: string
  id: string
  labelText: string
  message?: { text: string; type: string }
  Input?: Input
  onBlur?: (e: Event) => void
  type: string
  disabled?: boolean
  ProfileInput?: Input
}

export default class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super({
      ...props,
      Input: new Input({
        ...props,
        className: 'field__input',
        events: {
          blur: props.onBlur || (() => {}),
        },
      }),
      ProfileInput: new Input({
        ...props,
        className: 'field__input_profile',
        events: {
          blur: props.onBlur || (() => {}),
        },
      }),
    })
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
        {{#if message.text}}
          <p class="field__message {{message.type}}">{{message.text}}</p>
        {{/if}}
      </div>
    `
  }
}
