import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { CurrentUser } from '../decorators/current-user.decorator'
import { AuthBody, AuthBodyPipe } from '../pipes/validations/auth-body'
import {
  RegisterUserBody,
  RegisterUserBodyPipe,
} from '../pipes/validations/register-user'
import { UserPresenter } from '../presenter/user.presenter'

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

  @Get('/account')
  @UseGuards(AuthGuard)
  async account(@CurrentUser() user: UserEntity) {
    const output = await this.accountUseCase.execute({ user })
    const mappedOutupt = UserPresenter.mapUserFromInput(output)

    return mappedOutupt
  }
}
