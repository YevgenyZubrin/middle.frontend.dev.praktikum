import Block from './Block'
import Route from './Route'

class Router {
  routes: Route[] = []

  history: History = window.history

  private _currentRoute: Route | null = null

  private _rootQuery: string = ''

  // eslint-disable-next-line no-use-before-define
  private static __instance: Router | null = null

  private constructor(rootQuery: string) {
    this._rootQuery = rootQuery
    // eslint-disable-next-line no-useless-constructor, no-empty-function
    // private constructor() {}
  }

  public static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery)
    }
    return Router.__instance
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)

    if (!route) {
      return
    }

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.navigate(pathname)
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default Router
