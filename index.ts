// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars from 'handlebars'
// import button from './src/partials/button/button.hbs'
import * as Pages from './src/pages'
import profileFields from './src/public/constants/profileFields'
import changePasswordFields from './src/public/constants/changePasswordFields'
import signUpFields from './src/public/constants/signUpFields'
import chatList from './src/public/constants/chatList'

const pages = {
  login: [Pages.LoginPage, { signUpFields }],
  profile: [Pages.ProfilePage, {
    firstName: 'Ивашка',
    profileFields,
    changePasswordFields,
    editProfileMode: false,
    editPasswordMode: false,
  }],
  chats: [Pages.ChatsPage, {
    chatList,
    isSomeChatChoosed: false,
  }],
  Custom500: [Pages.Custom500],
  Custom404: [Pages.Custom404],
  nav: [Pages.NavigatePage],
}

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page]
  const container = document.getElementById('app')!

  if (source instanceof Object) {
    const somePage = new source(context)
    container.innerHTML = ''
    container.append(somePage.getContent())
    // page.dispatchComponentDidMount();
    return
  }

  container.innerHTML = Handlebars.compile(source)(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('chats')) // в конце заменить на 'nav'

document.addEventListener('click', (e) => {
  // @ts-ignore
  const page = e.target.getAttribute('page')
  if (page) {
    console.log('click somewhere', page)
    navigate(page)

    e.preventDefault()
    e.stopImmediatePropagation()
  }
})
