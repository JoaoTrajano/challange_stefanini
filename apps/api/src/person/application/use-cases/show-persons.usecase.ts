import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { ResourceNotFoundError } from '@/shared/application/errors'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'

export type ShowPersonUseCaseInput = {
  personId: string
}

export type ShowPersonUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    person: PersonEntity
  }
>

export class ShowPersonUseCase
  implements UseCase<ShowPersonUseCaseInput, ShowPersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: ShowPersonUseCaseInput
  ): Promise<ShowPersonUseCaseOutput> {
    const person = await this.personRepository.fetchById(input.personId)
    if (!person) return left(new ResourceNotFoundError('Pessoa não encontrada'))

    return right({ person })
  }
}
