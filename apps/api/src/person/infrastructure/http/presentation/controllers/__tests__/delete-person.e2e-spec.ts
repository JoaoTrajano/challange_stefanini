import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

describe('DeletePersonController e2e test', () => {
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

  describe('DELETE /persons', () => {
    test('should be able delete a by id', async () => {
      const created = await prismaService.person.create({
        data: {
          birthDate: new Date('1990-01-01'),
          document: '531.456.060-77',
          name: 'Person to delete',
        },
      })

      const res = await request(app.getHttpServer()).delete(
        `/persons/${created.id}`
      )

      expect(res.statusCode).toBe(204)
    })
  })
})
