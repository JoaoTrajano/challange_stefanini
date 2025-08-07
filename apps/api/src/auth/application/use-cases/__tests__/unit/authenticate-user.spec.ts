import { JwtService } from '@nestjs/jwt'
import { describe, expect, it } from 'vitest'

import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserInMemoryRepository } from '@/auth/infrastructure/database/in-memory/repositories/user-in-memory-repository'
import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'
import { AuthenticateUserUseCase } from '../../authenticate-user.usecase'

describe('AuthenticateUserUseCase', () => {
  it('should be able to authenticate a user', async () => {
    const userRepository = new UserInMemoryRepository()
    const bcrypt = new BcryptCrypterAdapter()

    const jwtService = new JwtService({
      secret: 'test_secret',
      signOptions: { expiresIn: '1h' },
    })

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      bcrypt,
      jwtService
    )

    const user = UserEntity.create({
      name: 'Jhon Dow',
      email: new Email({ value: 'example@gmail.com' }),
      password: new Password('1234567'),
    })

    user.props.password.encryptNewPassword(bcrypt, new Password('1234567'))
    await userRepository.create(user)

    const result = await authenticateUserUseCase.execute({
      email: user.props.email.value,
      password: '1234567',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value).toHaveProperty('access_token')
      expect(result.value.user).toBeInstanceOf(UserEntity)
      expect(result.value.user.id).toBe(user.id)
      expect(result.value.user.props.email).toBe(user.props.email)
      expect(result.value.user.props.name).toBe(user.props.name)
    }
  })
})
