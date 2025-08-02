import { Entity } from '@/shared/domain/entity'

type PersonEntityProps = {
  cpf: string
  name: string
  birthDate: Date
}

export class PersonEntity extends Entity<PersonEntityProps> {
  constructor(props: PersonEntityProps) {
    super(props)
  }
}
