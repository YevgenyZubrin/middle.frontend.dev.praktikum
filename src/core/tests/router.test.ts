// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
import sinon from 'sinon'
import Router from '../Router'
import { Custom404 } from '../../pages/404'
import { ChatsPage } from '../../pages/chats'

describe('Router', () => {
  const router = Router.getInstance('')
  router.use('/messenger', ChatsPage).use('/404', Custom404).start()
  const backSpy = sinon.spy()
  const forwardSpy = sinon.spy()
  global.window.history.back = backSpy
  global.window.history.forward = forwardSpy

  beforeEach(() => {
    router.go('/')
  })

  it('should go to url', () => {
    router.go('/settings')

    expect(window.location.href).to.be.equal('http://localhost:5173/settings')
  })

  it('should go back', () => {
    router.go('/settings')
    router.back()

    expect(backSpy.called).to.be.equal(true)
  })

  it('should go forward', () => {
    router.go('/settings')
    router.forward()

    expect(forwardSpy.called).to.be.equal(true)
  })

  describe('should get route', () => {
    it('if route exist', () => {
      const route = router.getRoute('/messenger')

      expect(route?.getRoutePathname()).to.be.equal('/messenger')
    })

    it('if route not exist', () => {
      const route = router.getRoute('/settings')

      expect(route?.getRoutePathname()).to.be.equal('/404')
    })
  })
})
