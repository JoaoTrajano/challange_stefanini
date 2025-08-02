import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, rigth } from '@/shared/errors/either'

export type FetchPersonUseCaseInput = {
  name?: string
  email?: string
  document?: string
}

export type FetchPersonUseCaseOutput = Either<
  unknown,
  {
    persons: PersonEntity[]
  }
>

export class FetchPersonUseCase
  implements UseCase<FetchPersonUseCaseInput, FetchPersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: FetchPersonUseCaseInput
  ): Promise<FetchPersonUseCaseOutput> {
    const persons = await this.personRepository.fetch(
      input.name,
      input.email,
      input.document
    )

    return rigth({ persons })
  }
}
