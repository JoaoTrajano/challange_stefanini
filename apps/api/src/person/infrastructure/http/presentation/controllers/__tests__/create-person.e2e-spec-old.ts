import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { afterAll, beforeAll, describe } from 'vitest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'
import request from 'supertest'

describe('CreatePersonController e2e test', () => {
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

  describe('POST /persons', () => {
    test('should be able return a entity person created', async () => {
      const res = await request(app.getHttpServer())
        .post('/persons')
        .send({
          name: 'New person',
          birthDate: new Date('1990-01-01'),
          document: '531.456.060-77',
        })
      const hasPerson = await prismaService.person.findFirst({
        where: {
          name: 'New person',
        },
      })
      expect(res.statusCode).toBe(201)
      expect(hasPerson).toBeTruthy()
    })
  })
})
