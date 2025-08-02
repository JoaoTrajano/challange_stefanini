import { describe, expect, it } from 'vitest'
import { PersonEntity } from '../person.entity'

describe('PersonEntity Unit Test', () => {
  it('should be able to create a person entity', () => {
    const person = new PersonEntity({
      birthDate: new Date(),
      cpf: '123456',
      name: 'Jhon Doe',
    })
    expect(person).toBeInstanceOf(PersonEntity)
  })
})
