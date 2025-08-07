import {
  AccountUseCaseOutput,
  AuthenticateUserOutput,
  RegisterUserUseCaseOutput,
} from '@/auth/application/use-cases'

export class AuthenticationPresenter {
  static mapAccountFromInput(output: AccountUseCaseOutput) {
    if (output.isRight())
      return {
        id: output.value.user.id,
        name: output.value.user.props.name,
        email: output.value.user.props.email,
      }

    return {}
  }

  static mapUserAuthenticatedFromInput(output: AuthenticateUserOutput) {
    if (output.isRight())
      return {
        id: output.value.user.id,
        name: output.value.user.props.name,
        email: output.value.user.props.email,
        access_token: output.value.access_token,
      }

    return {}
  }

  static mapUserRegistredFromInput(output: RegisterUserUseCaseOutput) {
    if (output.isRight())
      return {
        id: output.value.user.id,
        name: output.value.user.props.name,
        email: output.value.user.props.email,
      }

    return {}
  }
}
