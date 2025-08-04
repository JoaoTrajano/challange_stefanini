import { PersonEntity } from '@/person/domain/person.entity'
import { Document, Email } from '@/person/domain/value-objects'
import { Prisma, Person as PrismaClientPerson } from '@prisma/client'

export class PersonPrismaMapper {
  static toDomain(entity: PrismaClientPerson): PersonEntity {
    const personEntitie = new PersonEntity({
      name: entity.name,
      document: new Document(entity.document),
      birthDate: entity.birthDate,
    })

    personEntitie.id = entity.id
    personEntitie.props.gender = entity.gender
    personEntitie.props.email = entity.email ? new Email(entity.email) : null
    personEntitie.props.birthplace = entity.birthplace

    personEntitie.props.nationality = entity.nationality
    personEntitie.createdAt = entity.createdAt
    personEntitie.updatedAt = entity.updatedAt

    return personEntitie
  }

  static toPersistence(
    entity: PersonEntity
  ): Prisma.PersonUncheckedCreateInput {
    return {
      id: entity.id,
      name: entity.props.name,
      document: entity.props.document.getValue(),
      birthDate: entity.props.birthDate,
      gender: entity.props.gender ? entity.props.gender : null,
      email: entity.props.email ? entity.props.email.getValue() : null,
      birthplace: entity.props.birthplace ? entity.props.birthplace : null,
      nationality: entity.props.nationality ? entity.props.nationality : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }
  }
}
