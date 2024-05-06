const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

interface IOptions {
  data?: Document | XMLHttpRequestBodyInit | null
  headers?: Record<string, string>
  timeout?: number
  method: keyof typeof METHODS
}

function queryStringify(data: Document | XMLHttpRequestBodyInit | null) {
  if (data !== null) {
    return Object.entries(data)
      .map((entry) => entry.join('='))
      .join('&')
  }
  return ''
}

interface RequestParams {
  url: string
  options: IOptions
  timeout?: number
  withCredentials?: boolean
}

interface MethodParams {
  (url: string, options: IOptions): void
}

class HTTPTransport {
  get: MethodParams = (url, options) =>
    this.request({ url, options: { ...options, method: METHODS.GET }, timeout: options.timeout })

  post: MethodParams = (url, options) =>
    this.request({ url, options: { ...options, method: METHODS.POST }, timeout: options.timeout })

  put: MethodParams = (url, options) =>
    this.request({ url, options: { ...options, method: METHODS.PUT }, timeout: options.timeout })

  delete: MethodParams = (url, options) =>
    this.request({ url, options: { ...options, method: METHODS.DELETE }, timeout: options.timeout })

  // eslint-disable-next-line class-methods-use-this
  private request = ({ url, options, timeout = 5000, withCredentials = true }: RequestParams) => {
    const { data = null, headers = {}, method } = options

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(method, isGet && !!data ? `${url}?${queryStringify(data)}` : url)

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.withCredentials = withCredentials
      xhr.ontimeout = reject

      if (!data || isGet) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport
