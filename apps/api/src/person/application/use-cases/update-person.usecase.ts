import { Either, left, rigth } from '@/shared/errors/either'

import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type UpdatePersonUseCaseInput = {
  id: string
  name?: string
  email?: string
  gender?: string
  birthDate?: Date
  birthplace?: string
  nationality?: string
}

type UpdatePersonUseCaseOutput = Either<
  ResourceNotFoundError,
  {
    person: PersonEntity
  }
>

export class UpdatePersonUseCase
  implements UseCase<UpdatePersonUseCaseInput, UpdatePersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: UpdatePersonUseCaseInput
  ): Promise<UpdatePersonUseCaseOutput> {
    const personFound = await this.personRepository.fetchById(input.id)
    if (!personFound) return left(new ResourceNotFoundError('Person not found'))

    if (input.name) personFound.name = input.name
    if (input.email) personFound.email = input.email
    if (input.birthDate) personFound.birthDate = input.birthDate
    if (input.birthplace) personFound.birthplace = input.birthplace
    if (input.birthDate) personFound.birthDate = input.birthDate

    const personUpdated = await this.personRepository.update(personFound)
    return rigth({ person: personUpdated })
  }
}
