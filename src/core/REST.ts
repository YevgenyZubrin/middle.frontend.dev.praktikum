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

interface MethodParams {
  (url: string, options: IOptions): void
}

class HTTPTransport {
  get: MethodParams = (url, options) => this.request(url, { ...options, method: METHODS.GET }, options.timeout)

  post: MethodParams = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

  put: MethodParams = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout)

  delete: MethodParams = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

  // eslint-disable-next-line class-methods-use-this
  private request = (url: string, options: IOptions, timeout = 5000) => {
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
      xhr.ontimeout = reject

      if (!data || isGet) {
        xhr.send()
      } else {
        xhr.send(data)
      }
    })
  }
}

export default HTTPTransport
