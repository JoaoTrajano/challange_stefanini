import { UserEntity } from '@/auth/domain/entities/user.entity'
import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { Prisma, User as PrismaClientUser } from '@prisma/client'

export class UserPrismaMapper {
  static toDomain(entity: PrismaClientUser): UserEntity {
    const userEntity = new UserEntity({
      name: entity.name,
      email: new Email({ value: entity.email }),
    })

    userEntity.id = entity.id
    userEntity.props.password = new Password(entity.password)
    userEntity.createdAt = entity.createdAt
    userEntity.updatedAt = entity.updatedAt

    return userEntity
  }

  static toPersistence(entity: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      name: entity.props.name,
      email: entity.props.email.value,
      password: entity.props.password.value,
    }
  }
}
