import { PersonEntity } from '@/person/domain/person.entity'
import { PersonRepository } from '@/person/domain/repositories/person.repository'
import { Document } from '@/person/domain/value-objects/document.value-object'
import { Email } from '@/person/domain/value-objects/email.value-object'
import { UseCase } from '@/shared/application/use-cases/use-case.interface'
import { Either, left, rigth } from '@/shared/errors/either'
import { MissingFieldError } from '../errors/missing-field-error'

type CreatePersonUseCaseInput = {
  name: string
  document: Document
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
      PersonEntity.create({ ...input })
    )

    return rigth({ person: personCreated })
  }
}
