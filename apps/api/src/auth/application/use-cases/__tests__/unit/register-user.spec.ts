import { describe, expect, it } from 'vitest'

import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserInMemoryRepository } from '@/auth/infrastructure/database/in-memory/repositories/user-in-memory-repository'
import { RegisterUserUseCase } from '../../register-user.usecase'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'

let userRepository: UserInMemoryRepository
let sut: RegisterUserUseCase
let bcryptCrypterAdapter: BcryptCrypterAdapter

beforeAll(() => {
  userRepository = new UserInMemoryRepository()
  bcryptCrypterAdapter = new BcryptCrypterAdapter()

  sut = new RegisterUserUseCase(bcryptCrypterAdapter, userRepository)
})

describe('RegisterUserUseCaseOutput', () => {
  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'example@gmail.com',
      password: '123',
      confirmPassword: '123',
    })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user).toBeInstanceOf(UserEntity)
      expect(result.value.user.props.email.value).toBe('example@gmail.com')
      expect(result.value.user.props.name).toBe('Jhon Doe')
    }
  })

  it('should not be able to register a user if email is invalid', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'example',
      password: '123',
      confirmPassword: '123',
    })

    expect(result.isLeft()).toBeTruthy()
  })

  it('should not be able to register a user if password and confirm Password not the same', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'example@gmail.com',
      password: '123',
      confirmPassword: '123-diff',
    })

    expect(result.isLeft()).toBeTruthy()
  })
})
