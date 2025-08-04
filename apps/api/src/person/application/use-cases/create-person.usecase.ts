import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Document, Email } from '@/person/domain/value-objects'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, rigth } from '@/shared/errors/either'
import { MissingFieldError } from '../errors'

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
  MissingFieldError,
  { person: PersonEntity }
>

export class CreatePersonUseCase
  implements UseCase<CreatePersonUseCaseInput, CreatePersonUseCaseOutput>
{
  constructor(private readonly personRepository: PersonRepository) {}

  async execute(
    input: CreatePersonUseCaseInput
  ): Promise<CreatePersonUseCaseOutput> {
    if (!input.name) return left(new MissingFieldError('Name is required'))
    if (!input.document)
      return left(new MissingFieldError('Document is required'))
    if (!input.birthDate)
      return left(new MissingFieldError('Birth Date is required'))

    const person = PersonEntity.create({
      name: input.name,
      document: new Document(input.document),
      birthDate: input.birthDate,
    })

    if (input.email) person.props.email = new Email(input.email)
    if (input.gender) person.props.gender = input.gender
    if (input.birthDate) person.props.birthDate = input.birthDate
    if (input.birthplace) person.props.birthplace = input.birthplace
    if (input.birthDate) person.props.birthDate = input.birthDate

    const personCreated = await this.personRepository.create(person)

    return rigth({ person: personCreated })
  }
}
