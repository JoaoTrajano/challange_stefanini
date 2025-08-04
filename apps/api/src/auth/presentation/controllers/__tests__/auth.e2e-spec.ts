import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { UserEntity } from '@/auth/domain/entities/user.entity'
import { Password } from '@/auth/value-objects/password.value-object'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

describe('AuthTaskController e2e test', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    prismaService = moduleRef.get(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /authentication', () => {
    test('should be able to authenticate a user', async () => {
      const user = new UserEntity({
        email: 'jhonDoe@gmail.com',
        name: 'Jhon Doe',
      })
      user.password = new Password('123456')
      user.password.encryptNewPassword(
        new BcryptCrypterAdapter(),
        user.password
      )

      await prismaService.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password.value,
        },
      })

      const res = await request(app.getHttpServer())
        .post('/authentication')
        .send({
          email: user.email,
          password: '123456',
        })

      const hasUser = await prismaService.user.findFirst({
        where: {
          email: user.email,
        },
      })

      expect(res.statusCode).toBe(200)
      expect(hasUser).toBeTruthy()
    })
  })
})
