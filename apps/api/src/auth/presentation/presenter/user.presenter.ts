import { AccountUseCaseOutput } from '@/auth/application/use-cases/account.usecase'

export class UserPresenter {
  static mapUserFromInput(output: AccountUseCaseOutput) {
    if (output.isRight())
      return {
        id: output.value.user.id,
        name: output.value.user.props.name,
        email: output.value.user.props.email,
      }

    return {}
  }
}
