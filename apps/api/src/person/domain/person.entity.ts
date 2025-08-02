import { Entity } from '@/shared/domain/entity'
import { Optional } from '@/shared/types/optional'
import { Document } from './value-objects/document.value-object'
import { Email } from './value-objects/email.value-object'

type PersonEntityProps = {
  document: Document
  name: string
  birthDate: Date
  gender?: string
  email?: Email
  birthplace?: string
  nationality?: string
}

export class PersonEntity extends Entity<PersonEntityProps> {
  constructor(props: PersonEntityProps) {
    super(props)
  }

  get document(): string {
    return this.props.document.getValue()
  }

  get name(): string {
    return this.props.name
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  get gender(): string | undefined {
    return this.props.gender
  }

  get email(): string | undefined {
    return this.props.email.getValue()
  }

  get birthplace(): string | undefined {
    return this.props.birthplace
  }

  get nationality(): string | undefined {
    return this.props.nationality
  }

  static create(
    props: Optional<
      PersonEntityProps,
      'gender' | 'birthplace' | 'email' | 'nationality'
    >
  ): PersonEntity {
    return new PersonEntity({ ...props })
  }
}
