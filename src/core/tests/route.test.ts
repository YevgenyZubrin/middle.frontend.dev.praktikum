// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
import Sinon from 'sinon'
import Route from '../Route'
import { Custom404Mock } from './mocks/Custom404Mock'

describe('Route 404', () => {
  let route: Route

  beforeEach(() => {
    route = new Route('/404', Custom404Mock, {})
  })

  it('should not match pathnames', () => {
    expect(route.match('/500')).to.be.equal(false)
  })

  it('should match pathnames', () => {
    expect(route.match('/404')).to.be.equal(true)
  })

  it('should get route pathname', () => {
    expect(route.getRoutePathname()).to.be.equal('/404')
  })

  describe('should navigete to pathname', () => {
    it('if it exist', () => {
      const render = Sinon.spy()
      route.render = render
      route.navigate('/404')

      expect(render.called).to.be.equal(true)
    })

    it('if it not exist', () => {
      const render = Sinon.spy()
      route.render = render
      route.navigate('/500')

      expect(render.called).to.be.equal(false)
    })
  })

  describe('should leave route', () => {
    const hideSpy = Sinon.spy(Custom404Mock.prototype, 'hide')

    it('if route block not exist', () => {
      route.leave()

      expect(hideSpy.called).to.be.equal(false)
    })

    it('if route block exist', () => {
      route.render()
      route.leave()

      expect(hideSpy.called).to.be.equal(true)
    })
  })

  describe('should render route', () => {
    const showSpy = Sinon.spy(Custom404Mock.prototype, 'show')

    it('if route block not exist', () => {
      route.render()

      expect(showSpy.called).to.be.equal(false)
    })

    it('if route block exist', () => {
      route.render()
      route.render()

      expect(showSpy.called).to.be.equal(true)
    })
  })
})
