import { Entity } from '@/shared/domain/entity'
import { Optional } from '@/shared/types/optional'
import { Document, Email } from './value-objects'

export type PersonEntityProps = {
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

  set document(document: string) {
    this.props.document = new Document(document)
  }

  get document(): string {
    return this.props.document.getValue()
  }

  set name(name: string) {
    this.props.name = name
  }

  get name(): string {
    return this.props.name
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  set gender(gender: string) {
    this.props.gender = gender
  }

  get gender(): string | undefined {
    return this.props.gender
  }

  set email(email: string) {
    this.props.email = new Email(email)
  }

  get email(): string | undefined {
    return this.props.email.getValue()
  }

  set birthplace(birthplace: string) {
    this.props.birthplace = birthplace
  }

  get birthplace(): string | undefined {
    return this.props.birthplace
  }

  set nationality(nationality: string) {
    this.props.nationality = nationality
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
