import Block from '../../core/Block'

interface TypographyProps {
  className?: string
  text: string
}

export default class Typography extends Block<TypographyProps> {
  constructor(props: TypographyProps) {
    super({
      ...props,
    })
  }

  render() {
    return `
      <p class="typography {{className}}">{{text}}</p>
    `
  }
}
