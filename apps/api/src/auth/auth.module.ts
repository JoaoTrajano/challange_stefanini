import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'
import { RegisterUserUseCase } from './application/use-cases'
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.usecase'
import { UserRepository } from './domain/repositories/user.repository'
import { UserPrismaRepository } from './infrastructure/database/prisma/repositories/user-prisma-repository'
import { AuthController } from './presentation/controllers/auth.controller'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'BcryptCrypterAdapter',
      useFactory: () => {
        return new BcryptCrypterAdapter()
      },
    },
    {
      provide: 'AuthenticateUserUseCase',
      useFactory: (
        userRepository: UserRepository,
        crypter: BcryptCrypterAdapter,
        jwtService: JwtService
      ) => {
        return new AuthenticateUserUseCase(userRepository, crypter, jwtService)
      },
      inject: ['UserRepository', 'BcryptCrypterAdapter', JwtService],
    },
    {
      provide: 'RegisterUserUseCase',
      useFactory: (
        userRepository: UserRepository,
        crypter: BcryptCrypterAdapter
      ) => {
        return new RegisterUserUseCase(crypter, userRepository)
      },
      inject: ['UserRepository', 'BcryptCrypterAdapter'],
    },
  ],
})
export class AuthModule {}
