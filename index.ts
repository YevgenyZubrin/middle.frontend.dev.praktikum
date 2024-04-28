import Handlebars from 'handlebars'
import * as Pages from './src/pages'
import { chatList } from './src/public/constants'

const pages = {
  login: [Pages.LoginPage],
  profile: [
    Pages.ProfilePage,
    {
      firstName: 'Ивашка',
      editProfileMode: false,
      editPasswordMode: false,
    },
  ],
  chats: [
    Pages.ChatsPage,
    {
      chatList,
      isSomeChatChoosed: false,
    },
  ],
  Custom500: [Pages.Custom500],
  Custom404: [Pages.Custom404],
  nav: [Pages.NavigatePage],
}

function navigate(page: string) {
  const [Source, context] = pages[page]
  const container = document.getElementById('app')!

  if (Source instanceof Object) {
    const somePage = new Source(context)
    container.innerHTML = ''
    container.append(somePage.getContent())
    return
  }

  container.innerHTML = Handlebars.compile(Source)(context)
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'))

document.addEventListener('click', (e: Event) => {
  if (e.target instanceof HTMLElement) {
    const page = e.target.getAttribute('page')
    if (page) {
      navigate(page)

      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }
})
