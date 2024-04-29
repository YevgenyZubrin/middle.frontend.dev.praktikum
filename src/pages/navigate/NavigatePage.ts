import Block from '../../core/Block'

export default class NavigatePage extends Block {
  render() {
    return `
      <ul>
          <li><a href="#" page="login">Login</a></li>
          <li><a href="#" page="profile">Profile</a></li>
          <li><a href="#" page="chats">Chats</a></li>
          <li><a href="#" page="Custom500">500</a></li>
          <li><a href="#" page="Custom404">404</a></li>
      </ul>
    `
  }
}
