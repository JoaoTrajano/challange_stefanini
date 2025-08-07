import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'
import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { ValidationError } from '@/shared/application/errors'
import { MissingFieldError } from '@/shared/application/errors/missing-field-error'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'

type RegisterUserUseCaseInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterUserUseCaseOutput = Either<
  MissingFieldError | ValidationError,
  {
    user: UserEntity
  }
>
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
    if (!Email.isValid(input.email))
      return left(new MissingFieldError('Document is required'))

    if (Password.passwordsAreTheSame(input.password, input.confirmPassword))
      return left(
        new ValidationError(
          'As senhas não coincidem. Por favor, verifique se ambas são iguais.'
        )
      )

    const user = UserEntity.create({
      name: input.name,
      email: new Email({ value: input.email }),
    })

    user.props.password = new Password(input.password)
    user.props.password.encryptNewPassword(this.crypter, user.props.password)

    const userCreated = await this.userRepository.create(user)
    return right({ user: userCreated })
  }
}
