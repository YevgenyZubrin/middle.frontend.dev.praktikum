import Block from '../../core/Block'
import { ChooseAvatarInputProps } from './interfaces'

class ChooseAvatarInput extends Block<ChooseAvatarInputProps> {
  constructor(props: ChooseAvatarInputProps) {
    super({
      ...props,
      events: {
        change: props.onChange || (() => {}),
      },
    })
  }

  render() {
    return `
      <div>
        <input style='display: none;' type='file' id='avatar' accept='image/*' name='avatar' />
      </div>
    `
  }
}

export default ChooseAvatarInput
