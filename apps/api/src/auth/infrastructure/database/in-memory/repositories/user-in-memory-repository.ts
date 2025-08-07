import { UserEntity } from '@/auth/domain/entities/user.entity'
import { UserRepository } from '@/auth/domain/repositories/user.repository'

export class UserInMemoryRepository extends UserRepository {
  public users: UserEntity[] = []

  constructor() {
    super()
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.push(user)
    return user
  }

  async fetchById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id)
    return user ? user : null
  }

  async fetchByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.props.email.value === email)
    return user ? user : null
  }
}
