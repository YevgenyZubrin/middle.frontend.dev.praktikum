import { Input } from '../../components/Input'
import Block from '../../core/Block'

export default class Field extends Block {
  constructor(props) {
    super({
      ...props,
      Input: new Input({
        ...props,
        className: 'field__input',
        events: {
          blur: props.onBlur || (() => {}),
        },
      }),
    })
  }

  render() {
    return `<div class="field{{#if isProfile}} field_profile{{/if}} {{className}}">
              <label class="field__label" for={{id}}>
                {{labelText}}
              </label>
              {{{ Input }}}
              {{#if message.text}}
                <p class="field__message {{message.type}}">{{message.text}}</p>
              {{/if}}
            </div>`
  }
}
