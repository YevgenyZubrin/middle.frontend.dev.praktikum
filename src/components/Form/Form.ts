import Block from '../../core/Block'

export default class Form extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: props.onSubmit || (() => {}),
      },
    })
  }

  render() {
    return `
      <form>
        {{{ formChildren }}}
      </form>
    `
  }
}
