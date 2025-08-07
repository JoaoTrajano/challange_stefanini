import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { UserEntity } from '@/auth/domain/entities/user.entity'
import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'
import { UserFactory } from '@/test/factories/make-user'

describe('[POST] /authenticate E2E Test', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UserFactory, BcryptCrypterAdapter],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /authentication', () => {
    test('should be able to authenticate a user', async () => {
      const user = await userFactory.makePrismaUser({
        name: 'Jhon Doe',
        email: new Email({ value: 'example@teste.com' }),
        password: new Password('123456'),
      })

      const res = await request(app.getHttpServer())
        .post('/authentication')
        .send({
          email: user.props.email.value,
          password: '123456',
        })

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('id')
    })
  })
})
