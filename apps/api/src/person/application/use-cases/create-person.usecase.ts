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
  email?: Email
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

    const personCreated = await this.personRepository.create(
      PersonEntity.create({ ...input, document: new Document(input.document) })
    )

    return rigth({ person: personCreated })
  }
}
