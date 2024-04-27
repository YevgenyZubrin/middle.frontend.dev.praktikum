import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './EventBus'

type IChildren = Record<string, unknown[]>
type IProps = Record<string, unknown[]>

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const

  private _element: Element | null = null

  children: IChildren = {}

  props: IProps = {}

  private eventBus: () => EventBus<EVENTS>

  // private meta = null

  _id = nanoid(6)

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus()
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

    if (this._element) {
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

  // private createResources() {
  //   const { tagName } = this.meta
  //   this._element = this.createDocumentElement(tagName)
  // }

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

  // eslint-disable-next-line class-methods-use-this
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

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = this.createDocumentElement('template') as HTMLTemplateElement

    const template = Handlebars.compile(this.render())(propsAndStubs)

    fragment.innerHTML = template

    const newElement = fragment.content.firstElementChild

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child.getContent())
    })

    if (this._element && newElement) {
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
  private createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
    if (tagName === 'template') {
      return document.createElement(tagName) as HTMLTemplateElement
    }

    return document.createElement(tagName)
  }

  show() {
    const content = this.getContent() as HTMLElement
    if (content !== null) {
      content.style.display = 'block'
    }
  }

  hide() {
    const content = this.getContent() as HTMLElement
    if (content !== null) {
      content.style.display = 'none'
    }
  }
}
