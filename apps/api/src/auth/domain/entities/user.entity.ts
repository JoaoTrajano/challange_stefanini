import { Password } from '@/auth/value-objects/password.value-object'
import { Email } from '@/person/domain/value-objects'
import { Entity } from '@/shared/domain/entity'
import { Optional } from '@/shared/types/optional'

export type UserEntityProps = {
  email: Email
  name: string
  password?: Password
}

export class UserEntity extends Entity<UserEntityProps> {
  constructor(props: UserEntityProps) {
    super(props)
  }

  set name(name: string) {
    this.props.name = name
  }

  get name(): string {
    return this.props.name
  }

  set email(email: string) {
    this.props.email = new Email({ value: email })
  }

  get email(): Email | undefined {
    return this.props.email ? this.props.email : undefined
  }

  set password(password: string) {
    this.props.password = new Password(password)
  }

  get password(): Password | undefined {
    return this.props.password ? this.props.password : undefined
  }

  static create(props: Optional<UserEntityProps, 'password'>): UserEntity {
    const user = new UserEntity({ ...props })

    return user
  }
}
