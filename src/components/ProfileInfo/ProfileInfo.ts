import Block from '../../core/Block'
import { connect } from '../../utils'

class ProfileInfo extends Block {
  render() {
    return `
      <div class='profile-info'>
        <div class='profile-info__line'>
          <p>Почта</p>
          <p>{{user.values.email}}</p>
        </div>

        <div class='profile-info__line'>
          <p>Логин</p>
          <p>{{user.values.login}}</p>
        </div>

        <div class='profile-info__line'>
          <p>Имя</p>
          <p>{{user.values.first_name}}</p>
        </div>

        <div class='profile-info__line'>
          <p>Фамилия</p>
          <p>{{user.values.second_name}}</p>
        </div>

        <div class='profile-info__line'>
          <p>Имя в чате</p>
          <p>{{user.values.display_name}}</p>
        </div>

        <div class='profile-info__line'>
          <p>Телефон</p>
          <p>{{user.values.phone}}</p>
        </div>
      </div>
    `
  }
}

export default connect(({ user }) => ({ user }))(ProfileInfo)
