// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
import { UserValueType } from '../../core/types'
import adaptUserToValidate from '../adaptUserToValidate'

const form: UserValueType = {
  email: 'test@test.test',
  login: 'test',
  first_name: 'name',
  second_name: 'surename',
  display_name: 'nickname',
  phone: '87777777777',
  avatar: '',
  id: 123,
}

describe('adaptUserToValidate', () => {
  it('should return correct object', () => {
    const result = adaptUserToValidate(form)

    expect(result).to.deep.equal({
      email: 'test@test.test',
      login: 'test',
      first_name: 'name',
      second_name: 'surename',
      display_name: 'nickname',
      phone: '87777777777',
    })
  })
})
