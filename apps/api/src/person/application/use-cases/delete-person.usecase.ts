import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { ResourceNotFoundError } from '@/shared/application/errors'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'

type DeletePersonUseCaseInput = {
  id: string
}

type DeletePersonUseCaseOutput = Either<
  ResourceNotFoundError,
  { person: PersonEntity }
>

export class DeletePersonUseCase
  implements UseCase<DeletePersonUseCaseInput, DeletePersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: DeletePersonUseCaseInput
  ): Promise<DeletePersonUseCaseOutput> {
    const person = await this.personRepository.fetchById(input.id)
    if (!person)
      return left(new ResourceNotFoundError('Usuário não encontrado.'))

    await this.personRepository.delete(input.id)

    return right({ person })
  }
}
