import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'
import { PersonPrismaMapper } from '../mappers/person.prisma-mapper'

export class PersonPrismaRepository implements PersonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(person: PersonEntity): Promise<PersonEntity> {
    const personCreated = await this.prismaService.person.create({
      data: PersonPrismaMapper.toPersistence(person),
    })

    return PersonPrismaMapper.toDomain(personCreated)
  }

  async update(person: PersonEntity): Promise<PersonEntity> {
    const personUpdated = await this.prismaService.person.update({
      where: { id: person.id },
      data: PersonPrismaMapper.toPersistence(person),
    })

    return PersonPrismaMapper.toDomain(personUpdated)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.person.delete({ where: { id } })
  }

  async fetch(
    name?: string,
    email?: string,
    cpf?: string
  ): Promise<PersonEntity[]> {
    const where = {}

    if (name) {
      Object.assign(where, {
        name,
      })
    }

    if (email) {
      Object.assign(where, {
        email,
      })
    }

    if (cpf) {
      Object.assign(where, {
        cpf,
      })
    }

    const persons = await this.prismaService.person.findMany({
      where,
      orderBy: {
        createdAt: 'asc',
      },
    })
    return persons.map(PersonPrismaMapper.toDomain)
  }

  async fetchById(id: string): Promise<PersonEntity | null> {
    const person = await this.prismaService.person.findUnique({ where: { id } })
    return person ? PersonPrismaMapper.toDomain(person) : null
  }
}
