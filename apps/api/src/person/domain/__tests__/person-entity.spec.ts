import { describe, expect, it } from 'vitest'
import { PersonEntity } from '../person.entity'
import { Document } from '../value-objects'

describe('PersonEntity Unit Test', () => {
  it('should be able to create a person entity', () => {
    const person = new PersonEntity({
      birthDate: new Date(),
      document: new Document('456.996.428-11'),
      name: 'Jhon Doe',
    })
    expect(person).toBeInstanceOf(PersonEntity)
  })

  it("should be able to create a person entity by method static 'create'", () => {
    const person = PersonEntity.create({
      birthDate: new Date(),
      document: new Document('456.996.428-11'),
      name: 'Jhon Doe',
    })
    expect(person.document).toEqual('45699642811')
  })
})
