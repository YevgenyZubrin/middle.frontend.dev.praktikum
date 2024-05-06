import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './EventBus'

export const liveCycleEvents = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_RENDER: 'flow:render',
} as const

const eventTypes = {
  click: 'click',
  blur: 'blur',
  submit: 'submit',
} as const

type TEvents = Values<typeof liveCycleEvents>
type TEventTypes = Values<typeof eventTypes>

type Tevents = { [key in TEventTypes]: () => void }
type TProps = {
  events?: Tevents
} & AnyProps

// использую any потому что пропсы погут быть любыми

export default class Block<Props extends AnyProps = AnyProps> {
  private _element: Element | null = null

  children: TProps = {}

  props: TProps = {}

  private eventBus

  _id = nanoid(6)

  constructor(propsWithChildren: Props = {} as Props) {
    const eventBus = new EventBus()
    const { props, children } = this.getChildrenAndProps(propsWithChildren)
    this.props = this.makePropsProxy({ ...props })
    this.children = children

    this.eventBus = () => eventBus

    this.registerEvents(eventBus)

    eventBus.emit(liveCycleEvents.INIT)
  }

  private addEvents() {
    const { events = {} as Tevents } = this.props

    Object.keys(events).forEach((eventName) => {
      const name = eventName as TEventTypes

      if (this._element) {
        this._element.addEventListener(eventName, events[name])
      }
    })
  }

  private removeEvents() {
    const { events = {} as Tevents } = this.props

    if (this._element) {
      Object.keys(events).forEach((eventName) => {
        const name = eventName as TEventTypes

        if (this._element) {
          this._element.removeEventListener(eventName, events[name])
        }
      })
    }
  }

  private registerEvents(eventBus: EventBus<TEvents>) {
    eventBus.on(liveCycleEvents.INIT, this._init.bind(this))
    eventBus.on(liveCycleEvents.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(liveCycleEvents.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(liveCycleEvents.FLOW_RENDER, this._render.bind(this))
  }

  _init() {
    this.init()

    this.eventBus().emit(liveCycleEvents.FLOW_RENDER)
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
    this.eventBus().emit(liveCycleEvents.FLOW_CDM)
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate()
    if (!response) {
      return
    }

    this._render()
  }

  componentDidUpdate() {
    return true
  }

  dispatchComponentDidUpdate(oldTarget: TProps, newProps: TProps) {
    this.eventBus().emit(liveCycleEvents.FLOW_CDU, oldTarget, newProps)
  }

  // eslint-disable-next-line class-methods-use-this
  private getChildrenAndProps(propsAndChildren: Props) {
    const children: TProps = {}
    const props: TProps = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  setProps = (nextProps: TProps) => {
    if (!nextProps) {
      return
    }
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

  private makePropsProxy(props: TProps) {
    const updateComponent = (oldTarget: TProps, target: TProps) => {
      this.eventBus().emit(liveCycleEvents.FLOW_CDU, oldTarget, target)
    }

    const updateComponentBind = updateComponent.bind(this)

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop, value) {
        const oldTarget = { ...target }
        // eslint-disable-next-line no-param-reassign
        target[prop as string] = value
        updateComponentBind(oldTarget, target)
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
