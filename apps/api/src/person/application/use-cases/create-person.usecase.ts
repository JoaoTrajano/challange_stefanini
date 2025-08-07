import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Document, Email } from '@/person/domain/value-objects'
import { ValidationError } from '@/shared/application/errors'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, right } from '@/shared/errors/either'

type CreatePersonUseCaseInput = {
  name: string
  document: string
  birthDate: Date
  gender?: string
  email?: string
  birthplace?: string
  nationality?: string
}

type CreatePersonUseCaseOutput = Either<
  ValidationError,
  { person: PersonEntity }
>

export class CreatePersonUseCase
  implements UseCase<CreatePersonUseCaseInput, CreatePersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: CreatePersonUseCaseInput
  ): Promise<CreatePersonUseCaseOutput> {
    const document = new Document(input.document)
    if (!document.isValid())
      return left(new ValidationError('Birth Date is required'))

    const person = PersonEntity.create({
      name: input.name,
      document,
      birthDate: input.birthDate,
    })

    if (input.email) person.props.email = new Email({ value: input.email })
    if (input.gender) person.props.gender = input.gender
    if (input.birthDate) person.props.birthDate = input.birthDate
    if (input.birthplace) person.props.birthplace = input.birthplace
    if (input.birthDate) person.props.birthDate = input.birthDate
    if (input.nationality) person.props.nationality = input.nationality

    const personCreated = await this.personRepository.create(person)

    return right({ person: personCreated })
  }
}
