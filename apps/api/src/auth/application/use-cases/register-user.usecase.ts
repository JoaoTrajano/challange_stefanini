import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'
import { Password } from '@/auth/value-objects/password.value-object'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'

type RegisterUserUseCaseInput = {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseOutput = {
  user: UserEntity
}

export class RegisterUserUseCase
  implements UseCase<RegisterUserUseCaseInput, RegisterUserUseCaseOutput>
{
  constructor(
    private readonly crypter: BcryptCrypterAdapter,
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    input: RegisterUserUseCaseInput
  ): Promise<RegisterUserUseCaseOutput> {
    if (!input.name) throw new Error('Name is required')
    if (!input.email) throw new Error('Email is required')
    if (!input.password) throw new Error('Password is required')

    const user = new UserEntity({ name: input.name, email: input.email })
    user.props.password = new Password(input.password)

    user.props.password.encryptNewPassword(this.crypter, user.props.password)

    const userCreated = await this.userRepository.create(user)
    return { user: userCreated }
  }
}
