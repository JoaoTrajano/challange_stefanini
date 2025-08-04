import { Repository } from '@/shared/infrastructure/database/repository.inteface'

import { UserEntity, UserEntityProps } from '../entities/user.entity'

export abstract class UserRepository
  implements
    Omit<
      Repository<UserEntityProps, UserEntity>,
      'update' | 'delete' | 'fetchAll'
    >
{
  abstract create(user: UserEntity): Promise<UserEntity>
  abstract fetchById(id: string): Promise<UserEntity | null>
  abstract fetchByEmail(email: string): Promise<UserEntity | null>
}
