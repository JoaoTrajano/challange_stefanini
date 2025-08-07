import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

describe('[POST] /authentication/register E2E Test', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prismaService = moduleRef.get(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('[POST] authentication/register', () => {
    test('should be able to register a user', async () => {
      const res = await request(app.getHttpServer())
        .post('/authentication/register')
        .send({
          name: 'Jhon Doe',
          password: '123456',
          confirmPassword: '123456',
          email: 'example@gmail.com',
        })

      const hasUser = await prismaService.user.findFirst({
        where: {
          email: 'example@gmail.com',
        },
      })

      expect(hasUser).toBeTruthy()
      expect(res.body).toHaveProperty('id')
    })
  })
})
