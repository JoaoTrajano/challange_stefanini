import { Password } from '@/auth/value-objects/password.value-object'
import { Entity } from '@/shared/domain/entity'
import { Optional } from '@/shared/types/optional'

const DEFAULT_PASSWORD = '123456'

export type UserEntityProps = {
  email: string
  name: string
  password?: Password
}

export class UserEntity extends Entity<UserEntityProps> {
  public email: string
  public name: string
  public password: Password

  constructor(props: UserEntityProps) {
    super(props)
  }

  static create(props: Optional<UserEntityProps, 'password'>): UserEntity {
    const user = new UserEntity({ ...props })
    user.props.password = new Password(DEFAULT_PASSWORD)

    return user
  }
}
