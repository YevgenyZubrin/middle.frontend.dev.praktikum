// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
import { TestComponent } from './mocks/TestComponent'
import Block from '../Block'
import { HTMLElementMock } from './mocks/HTMLElementMock'

describe('Block', () => {
  let Component: Block

  beforeEach(() => {
    Component = new TestComponent({ value: '' })
    ;(global as any).HTMLElement = HTMLElementMock
  })

  it('should component have correct props', () => {
    expect(Component.props.value).to.be.equal('')
  })

  it('should change props', () => {
    Component.setProps({ value: 'test' })

    expect(Component.props.value).to.be.equal('test')
  })

  it('should rerender component after changing props', () => {
    expect(Component.componentDidUpdate({ value: '' }, { value: 'test' })).to.be.equal(true)
  })

  it('should set display as block', () => {
    Component.show()

    expect(Component.element?.getAttribute('style')).to.be.equal('display: block;')
  })

  it('should set display as none', () => {
    Component.hide()

    expect(Component.element?.getAttribute('style')).to.be.equal('display: none;')
  })
})
