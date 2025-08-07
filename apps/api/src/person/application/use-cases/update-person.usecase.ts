import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Email } from '@/person/domain/value-objects'
import { ResourceNotFoundError } from '@/shared/application/errors'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'

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

    if (input.name) personFound.props.name = input.name
    if (input.email) personFound.props.email = new Email({ value: input.email })
    if (input.gender) personFound.props.gender = input.gender
    if (input.birthDate) personFound.props.birthDate = input.birthDate
    if (input.birthplace) personFound.props.birthplace = input.birthplace
    if (input.birthDate) personFound.props.birthDate = input.birthDate
    if (input.nationality) personFound.props.nationality = input.nationality

    const personUpdated = await this.personRepository.update(personFound)
    return right({ person: personUpdated })
  }
}
