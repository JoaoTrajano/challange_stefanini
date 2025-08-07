import { UserEntity, UserEntityProps } from '@/auth/domain/entities/user.entity'
import { UserPrismaMapper } from '@/auth/infrastructure/database/prisma/mappers/user.prisma-mapper'
import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeUser(override: Partial<UserEntityProps> = {}) {
  const userCreated = UserEntity.create({
    name: 'Jhon Doe',
    email: new Email({ value: 'example@gmail.com' }),
    password: new Password('1234567'),
    ...override,
  })

  return userCreated
}

@Injectable()
export class UserFactory {
  constructor(
    private prisma: PrismaService,
    private readonly crypter: BcryptCrypterAdapter
  ) {}

  async makePrismaUser(
    data: Partial<UserEntityProps> = {}
  ): Promise<UserEntity> {
    const user = makeUser(data)
    user.props.password.encryptNewPassword(this.crypter, user.props.password)

    await this.prisma.user.create({
      data: UserPrismaMapper.toPersistence(user),
    })

    return user
  }
}
