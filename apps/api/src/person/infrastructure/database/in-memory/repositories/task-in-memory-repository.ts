import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'

export class PersonInMemoryRepository extends PersonRepository {
  public persons: PersonEntity[] = []

  constructor() {
    super()
  }

  async create(person: PersonEntity): Promise<PersonEntity> {
    this.persons.push(person)
    return person
  }

  async update(person: PersonEntity): Promise<PersonEntity | null> {
    const index = this.persons.findIndex((t) => t.id === person.id)
    if (index === -1) return null

    this.persons[index] = person
    return person
  }

  async delete(id: string): Promise<void> {
    const index = this.persons.findIndex((t) => t.id === id)
    if (index !== -1) {
      this.persons.splice(index, 1)
    }
  }

  async fetch(
    name?: string,
    email?: string,
    cpf?: string
  ): Promise<PersonEntity[]> {
    const persons = this.persons.filter((person) => {
      if (name && !person.name.includes(name)) return false
      if (email && !person.email.includes(email)) return false
      if (cpf && !person.name.includes(cpf)) return false
      return true
    })

    return persons
  }

  async fetchById(id: string): Promise<PersonEntity | null> {
    const person = this.persons.find((person) => person.id === id)
    return person ? person : null
  }
}
