import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './EventBus'
import { isEqual } from '../utils'

export const liveCycleEvents = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_CWU: 'flow:component-will-unmount',
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
    eventBus.on(liveCycleEvents.FLOW_CWU, this._componentWillUnmount.bind(this))
    eventBus.on(liveCycleEvents.FLOW_RENDER, this._render.bind(this))
  }

  _init() {
    this.init()

    this.eventBus().emit(liveCycleEvents.FLOW_RENDER)
  }

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

  _componentDidUpdate(oldProps: AnyProps, newProps: AnyProps) {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }

    this._render()
  }

  componentDidUpdate(oldProps: AnyProps, newProps: AnyProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      return true
    }
    return false
  }

  dispatchComponentDidUpdate(oldTarget: TProps, newProps: TProps) {
    this.eventBus().emit(liveCycleEvents.FLOW_CDU, oldTarget, newProps)
  }

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

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this._element)

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000)
      return
    }

    this.eventBus().emit(liveCycleEvents.FLOW_CWU, this.props)
  }

  _componentWillUnmount() {
    this.componentWillUnmount()
  }

  componentWillUnmount() {}

  _render() {
    this.removeEvents()

    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })
    const childrenProps: Record<string, any>[] = []
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value
          .map((item) => {
            if (item instanceof Block) {
              childrenProps.push(item)
              return `<div data-id="${item._id}"></div>`
            }

            return item
          })
          .join('')
      }
    })
    const fragment = this.createDocumentElement('template') as HTMLTemplateElement

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs)
    const newElement = fragment.content.firstElementChild

    ;[...Object.values(this.children), ...childrenProps].forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child.getContent())
    })

    if (
      this._element &&
      newElement !== null &&
      this._element instanceof HTMLElement &&
      newElement instanceof HTMLElement
    ) {
      newElement.style.display = this._element.style.display
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this.addEvents()
  }

  render() {}

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount()
        }
      }, 100)
    }

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
