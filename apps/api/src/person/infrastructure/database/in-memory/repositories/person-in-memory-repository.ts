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
    page?: number,
    perPage?: number,
    name?: string,
    email?: string,
    document?: string
  ): Promise<{ persons: PersonEntity[]; count: number }> {
    const filteredPersons = this.persons.filter((person) => {
      if (name && !person.name.toLowerCase().includes(name.toLowerCase()))
        return false
      if (email && !person.email?.toLowerCase().includes(email.toLowerCase()))
        return false
      if (document && !person.document.includes(document)) return false
      return true
    })

    const count = filteredPersons.length
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const data = filteredPersons.slice(startIndex, endIndex)

    return { persons: data, count }
  }

  async fetchById(id: string): Promise<PersonEntity | null> {
    const person = this.persons.find((person) => person.id === id)
    return person ? person : null
  }
}
