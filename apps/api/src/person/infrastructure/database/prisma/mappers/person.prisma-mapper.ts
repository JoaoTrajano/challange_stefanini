import { PersonEntity } from '@/person/domain/person.entity'
import { Document } from '@/person/domain/value-objects'
import { Prisma, Person as PrismaClientPerson } from '@prisma/client'

export class PersonPrismaMapper {
  static toDomain(entity: PrismaClientPerson): PersonEntity {
    const personEntitie = new PersonEntity({
      name: entity.name,
      document: new Document(entity.document),
      birthDate: entity.birthDate,
    })

    personEntitie.id = entity.id
    personEntitie.gender = entity.gender
    personEntitie.email = entity.email
    personEntitie.birthplace = entity.birthplace
    personEntitie.nationality = entity.nationality

    personEntitie.createdAt = entity.createdAt
    personEntitie.updatedAt = entity.updatedAt

    return personEntitie
  }

  static toPersistence(
    entity: PersonEntity
  ): Prisma.PersonUncheckedCreateInput {
    return {
      id: entity.id,
      name: entity.name,
      document: entity.document,
      birthDate: entity.birthDate,
      gender: entity.gender,
      email: entity.email,
      birthplace: entity.birthplace,
      nationality: entity.nationality,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
