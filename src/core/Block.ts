/* eslint-disable */
// @ts-nocheck

import { nanoid } from 'nanoid'
import Handlebars from 'handlebars'
import EventBus from './EventBus'

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  _element = null

  private meta = null

  _id = nanoid(6)

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

  private _eventbus

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus()
    // this._meta = {
    //   tagName,
    //   props
    // };
    const { props, children } = this.getChildrenAndProps(propsWithChildren)
    this.props = this.makePropsProxy({ ...props })
    this.children = children

    this.eventBus = () => eventBus

    this.registerEvents(eventBus)

    eventBus.emit(Block.EVENTS.INIT)
  }

  private addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName])
    })
  }

  private removeEvents() {
    const { events = {} } = this.props

    if(this._element) {
      Object.keys(events).forEach((eventName) => {
        this._element.removeEventListener(eventName, events[eventName])
      })
    }
  }

  private registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private createResources() {
    const { tagName } = this.meta
    this._element = this.createDocumentElement(tagName)
  }

  _init() {
    // this.createResources();
    this.init()

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  // eslint-disable-next-line class-methods-use-this
  init() {}

  _componentDidMount() {
    this.componentDidMount()

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }

    this._render()
  }

  componentDidUpdate(oldProps, newProps) {
    return true
  }

  dispatchComponentDidUpdate(oldTarget, newProps) {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newProps)
  }

  private getChildrenAndProps(propsAndChildren) {
    const children = {}
    const props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return
    }
    // console.log({props:this.props,nextProps})
    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _render() {
    this.removeEvents()

    const propsAndStubs = { ...this.props }
// console.log({propsAndStubs})
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this.createDocumentElement('template')

    // console.log({render: this.render(), propsAndStubs})
    const template = Handlebars.compile(this.render())(propsAndStubs)

    // console.log({template})

    fragment.innerHTML = template

    const newElement = fragment.content.firstElementChild

    Object.values(this.children).forEach((child) => {
      // console.log(child)
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child.getContent())
    })

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this.addEvents()
  }

  render() {}

  getContent() {
    return this.element
  }

  private makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+

    const self = this

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        target[prop] = value
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  // eslint-disable-next-line class-methods-use-this
  private createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    this.getContent().style.display = 'block'
  }

  hide() {
    this.getContent().style.display = 'none'
  }
}
