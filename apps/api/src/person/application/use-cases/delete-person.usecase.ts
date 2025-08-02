import { Either, left, rigth } from '@/shared/errors/either'

import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

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
    if (!person) return left(new ResourceNotFoundError('Person not Found.'))

    await this.personRepository.delete(input.id)

    return rigth({ person })
  }
}
