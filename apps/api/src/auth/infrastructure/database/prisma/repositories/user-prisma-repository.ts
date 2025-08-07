import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'
import { UserPrismaMapper } from '../mappers/user.prisma-mapper'

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const userCreated = await this.prismaService.user.create({
      data: UserPrismaMapper.toPersistence(user),
    })

    return UserPrismaMapper.toDomain(userCreated)
  }

  async fetchById(id: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } })
    return user ? UserPrismaMapper.toDomain(user) : null
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    return user ? UserPrismaMapper.toDomain(user) : null
  }
}
