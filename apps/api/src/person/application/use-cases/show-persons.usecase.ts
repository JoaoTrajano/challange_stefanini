import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, rigth } from '@/shared/errors/either'
import { ResourceNotFoundError } from '../errors'

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

    return rigth({ person })
  }
}
