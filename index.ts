import * as Pages from './src/pages'
import Router from './src/core/Router'

const router = Router.getInstance('#app')

router
  .use('/', Pages.LoginPage)
  .use('/sign-up', Pages.SignUpPage)
  .use('/messenger', Pages.ChatsPage)
  .use('/settings', Pages.ProfilePage)
  .use('/404', Pages.Custom404)
  .use('/500', Pages.Custom500)
  .start()
