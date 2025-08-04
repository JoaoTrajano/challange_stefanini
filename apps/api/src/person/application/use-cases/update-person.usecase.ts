import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Email } from '@/person/domain/value-objects'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, rigth } from '@/shared/errors/either'
import { ResourceNotFoundError } from '../errors'

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
    if (input.email) personFound.props.email = new Email(input.email)
    if (input.gender) personFound.props.gender = input.gender
    if (input.birthDate) personFound.props.birthDate = input.birthDate
    if (input.birthplace) personFound.props.birthplace = input.birthplace
    if (input.birthDate) personFound.props.birthDate = input.birthDate

    const personUpdated = await this.personRepository.update(personFound)
    return rigth({ person: personUpdated })
  }
}
