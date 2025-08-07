import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { AppModule } from '@/app.module'
import { makeUser, UserFactory } from '@/test/factories'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'

describe('[POST] /authentication/account E2E Test', () => {
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

  describe('[POST] authentication/account', () => {
    test('should be able to get a account user', async () => {
      const userCreated = await userFactory.makePrismaUser()

      const response = await request(app.getHttpServer())
        .post('/authentication')
        .send({
          email: userCreated.props.email.value,
          password: '1234567',
        })

      const res = await request(app.getHttpServer())
        .get('/authentication/account')
        .set('Authorization', `Bearer ${response.body.access_token}`)

      expect(res.body).toHaveProperty('id')
    })
  })
})
