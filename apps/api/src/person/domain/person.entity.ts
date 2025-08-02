import { Entity } from '@/shared/domain/entity'
import { Optional } from '@/shared/types/optional'

type PersonEntityProps = {
  cpf: string
  name: string
  birthDate: Date
  gender?: string
  email?: string
  birthplace?: string
  nationality?: string
}

export class PersonEntity extends Entity<PersonEntityProps> {
  constructor(props: PersonEntityProps) {
    super(props)
  }

  get cpf(): string {
    return this.props.cpf
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
    return this.props.email
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
