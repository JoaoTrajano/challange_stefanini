import { describe, expect, it } from 'vitest'
import { Email } from '../email.value-object'

describe('Value Object Email Unit Test', () => {
  it('should be return true if email is valid', () => {
    const email = new Email({ value: 'jhondoe@example.com' })
    expect(email.value).toEqual('jhondoe@example.com')
  })

  it('should be able of the return false if email isnt valid', () => {
    expect(Email.isValid('jhonDoe')).toBeFalsy()
  })
})
