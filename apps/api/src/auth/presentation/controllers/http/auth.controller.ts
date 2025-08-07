import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/auth/application/use-cases/authenticate-user.usecase'

import { RegisterUserUseCase } from '@/auth/application/use-cases'
import { AccountUseCase } from '@/auth/application/use-cases/account.usecase'
import { UserEntity } from '@/auth/domain/entities/user.entity'
import { AuthGuard } from '@/auth/infrastructure/guards/auth.guard'
import { SignUpForm } from '@people-management/validations'
import { CurrentUser } from '../../decorators/current-user.decorator'
import { AuthBody, AuthBodyPipe } from '../../pipes/validations/auth-body'
import { RegisterUserBodyPipe } from '../../pipes/validations/register-user'
import { AuthenticationPresenter } from '../../presenter/authentication.presenter'

@Controller('authentication')
export class AuthController {
  constructor(
    @Inject('AuthenticateUserUseCase')
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    @Inject('RegisterUserUseCase')
    private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject('AccountUseCase')
    private readonly accountUseCase: AccountUseCase
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(AuthBodyPipe)
  async authenticate(@Body() body: AuthBody) {
    const output = await this.authenticateUserUseCase.execute({
      email: body.email,
      password: body.password,
    })

    if (output.isLeft()) {
      const error = output.value
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
    }

    const mappedOutupt =
      AuthenticationPresenter.mapUserAuthenticatedFromInput(output)
    return mappedOutupt
  }

  @Post('/register')
  @UsePipes(RegisterUserBodyPipe)
  async register(@Body() body: SignUpForm) {
    const output = await this.registerUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      confirmPassword: body.passwordConfirm,
    })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt =
      AuthenticationPresenter.mapUserRegistredFromInput(output)
    return mappedOutupt
  }

  @Get('/account')
  @UseGuards(AuthGuard)
  async account(@CurrentUser() user: UserEntity) {
    const output = await this.accountUseCase.execute({ user })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt = AuthenticationPresenter.mapAccountFromInput(output)
    return mappedOutupt
  }
}
