import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Document } from '@/person/domain/value-objects'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, right } from '@/shared/errors/either'

export type FetchPersonUseCaseInput = {
  page?: number
  perPage?: number
  name?: string
  email?: string
  document?: string
}

export type FetchPersonUseCaseOutput = Either<
  unknown,
  {
    count: number
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
    let document = ''
    if (input.document) document = new Document(input.document).value

    const result = await this.personRepository.fetch(
      input.page,
      input.perPage,
      input.name,
      input.email,
      document
    )

    return right({ count: result.count, persons: result.persons })
  }
}
