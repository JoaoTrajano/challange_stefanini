import { describe, expect, it } from 'vitest'

import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserInMemoryRepository } from '@/auth/infrastructure/database/in-memory/repositories/user-in-memory-repository'
import { makeUser } from '@/test/factories'
import { AccountUseCase } from '../../account.usecase'

let userRepository: UserInMemoryRepository
let sut: AccountUseCase

beforeAll(() => {
  userRepository = new UserInMemoryRepository()
  sut = new AccountUseCase(userRepository)
})

describe('AccountUseCase', () => {
  it('should be able to authenticate a user', async () => {
    const userCreated = makeUser()
    userRepository.users.push(userCreated)

    const result = await sut.execute({ user: userCreated })

    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.user).toBeInstanceOf(UserEntity)
      expect(result.value.user.id).toBe(userCreated.id)
      expect(result.value.user.props.email).toBe(userCreated.props.email)
      expect(result.value.user.props.name).toBe(userCreated.props.name)
    }
  })

  it('should not be able get authenticate a user', async () => {
    const userCreated = makeUser()

    const result = await sut.execute({ user: userCreated })
    expect(result.isLeft()).toBeTruthy()
  })
})
