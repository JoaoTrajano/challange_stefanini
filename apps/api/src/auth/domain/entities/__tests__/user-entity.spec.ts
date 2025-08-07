import { describe, expect, it } from 'vitest'
import { UserEntity } from '../user.entity'
import { Email } from '@/person/domain/value-objects'

describe('UserEntity Unit Test', () => {
  it('should be able to create a User entity', () => {
    const user = new UserEntity({
      email: new Email({ value: 'example@gmail.com' }),
      name: 'Jhon Doe',
    })
    expect(user).toBeInstanceOf(UserEntity)
  })
})
