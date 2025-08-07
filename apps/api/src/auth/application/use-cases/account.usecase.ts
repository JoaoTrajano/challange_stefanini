import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'
import { UnauthorizedException } from '@nestjs/common'

type AccountUseCaseInput = {
  user: UserEntity
}

export type AccountUseCaseOutput = Either<
  UnauthorizedException,
  {
    user: UserEntity
  }
>

export class AccountUseCase
  implements UseCase<AccountUseCaseInput, AccountUseCaseOutput>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: AccountUseCaseInput): Promise<AccountUseCaseOutput> {
    const user = await this.userRepository.fetchById(input.user.id)
    if (!user) return left(new UnauthorizedException('Usuário não autenticado'))
    return right({ user })
  }
}
