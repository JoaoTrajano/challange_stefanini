import { describe, expect, it } from 'vitest'
import { Email } from '../email.value-object'

describe('Value Object Email Unit Test', () => {
  it('should be return true if email is valid', () => {
    const email = new Email('jhondoe@example.com')
    expect(email.getValue()).toEqual('jhondoe@example.com')
  })

  it('should be able of the return error if email isnt valid', () => {
    expect(() => new Email('jhonDoe')).toThrowError()
  })
})
