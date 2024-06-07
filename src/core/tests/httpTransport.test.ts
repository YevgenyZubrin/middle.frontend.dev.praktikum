// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
import Sinon, { SinonFakeXMLHttpRequest } from 'sinon'
import HTTPTransport, { METHODS, mainUrl } from '../HTTPTransport'
import { userMock } from './mocks/userMock'
import { profileMock } from './mocks/profileMock'
import { FormDataMock } from './mocks/FormDataMock'

describe('HTTPTransport', () => {
  let httpTransport: HTTPTransport
  let xhr: Sinon.SinonFakeXMLHttpRequestStatic
  let requests: SinonFakeXMLHttpRequest[]

  beforeEach(() => {
    requests = []
    xhr = Sinon.useFakeXMLHttpRequest()
    xhr.onCreate = (req: SinonFakeXMLHttpRequest): void => {
      requests.push(req)
    }
    ;(global as any).XMLHttpRequest = xhr
    ;(global as any).FormData = FormDataMock
  })

  afterEach(() => {
    xhr.restore()
  })

  it('should make GET request with correct parameters and handle response', (done) => {
    httpTransport = new HTTPTransport('/auth')
    httpTransport
      .get('/user', { headers: { 'Custom-Header': 'value' } })
      .then((res) => {
        expect(res).to.be.equal(JSON.stringify(userMock))
        done()
      })
      .catch((err) => {
        done(err)
      })

    expect(requests[0].requestHeaders['Custom-Header']).to.equal('value')
    expect(requests[0].url).to.equal(`${mainUrl}/auth/user`)
    expect(requests[0].method).to.equal(METHODS.GET)

    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(userMock))
  })

  it('should make PUT request with correct parameters and handle response', (done) => {
    httpTransport = new HTTPTransport('/user')
    httpTransport
      .put('/profile', { headers: { 'Custom-Header': 'value' }, data: profileMock })
      .then((res) => {
        expect(res).to.be.equal(JSON.stringify(userMock))
        done()
      })
      .catch((err) => {
        done(err)
      })

    expect(requests[0].requestHeaders['Custom-Header']).to.equal('value')
    expect(requests[0].url).to.equal(`${mainUrl}/user/profile`)
    expect(requests[0].method).to.equal(METHODS.PUT)
    expect(requests[0].requestBody).to.equal(JSON.stringify(profileMock))

    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(userMock))
  })

  it('should handle network errors', (done) => {
    httpTransport = new HTTPTransport('/auth')
    httpTransport.get('/user', {}).catch((err) => {
      expect(err).to.be.instanceOf(Error)
      done()
    })

    expect(requests).to.have.length(1)

    requests[0].respond(400, {}, '')
  })
})
