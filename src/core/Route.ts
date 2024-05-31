import Block from './Block'

class Route {
  private _pathname: string

  private _blockClass: typeof Block

  private _block: Block | null

  private _props: AnyProps

  constructor(pathname: string, view: typeof Block, props: AnyProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.hide()
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  private _renderDom(query: string, block: Block) {
    const root = document.querySelector(query)
    const content = block.getContent()

    if (root && content) {
      root.append(content)
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass()
      this._renderDom(this._props.rootQuery, this._block)
      return
    }

    this._block.show()
  }

  getRoutePathname() {
    return this._pathname
  }
}

export default Route
