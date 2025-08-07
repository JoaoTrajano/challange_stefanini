import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'
import { BcryptCrypterAdapter } from '@/shared/infrastructure/crypter/adapters/crypter'

type AuthenticateUserInput = {
  email: string
  password: string
}

export type AuthenticateUserOutput = Either<
  UnauthorizedException,
  {
    user: UserEntity
    access_token: string
  }
>

export class AuthenticateUserUseCase
  implements UseCase<AuthenticateUserInput, AuthenticateUserOutput>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypter: BcryptCrypterAdapter,
    private readonly jwtService: JwtService
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.userRepository.fetchByEmail(input.email)
    if (!user)
      return left(new UnauthorizedException('E-mail or password is invalid'))

    const isPasswordValid = this.crypter.compare(
      input.password,
      user.props.password.value
    )
    if (!isPasswordValid)
      return left(new UnauthorizedException('E-mail or password is invalid'))

    const access_token = await this.jwtService.signAsync({ user })
    return right({ user, access_token })
  }
}
