import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/auth/application/use-cases/authenticate-user.usecase'

import { RegisterUserUseCase } from '@/auth/application/use-cases'
import { AuthBody, AuthBodyPipe } from '../pipes/validations/auth-body'
import {
  RegisterUserBody,
  RegisterUserBodyPipe,
} from '../pipes/validations/register-user'

@Controller('authentication')
export class AuthController {
  constructor(
    @Inject('AuthenticateUserUseCase')
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    @Inject('RegisterUserUseCase')
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(AuthBodyPipe)
  async createUser(@Body() body: AuthBody) {
    const { user, access_token } = await this.authenticateUserUseCase.execute({
      email: body.email,
      password: body.password,
    })

    return { user, access_token }
  }

  @Post('/register')
  @HttpCode(201)
  @UsePipes(RegisterUserBodyPipe)
  async register(@Body() body: RegisterUserBody) {
    const { user } = await this.registerUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    })

    return user
  }
}
