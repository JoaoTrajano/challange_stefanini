import { Repository } from '@/shared/infrastructure/database/repository.inteface'
import { PersonEntity, PersonEntityProps } from '../person.entity'

export abstract class PersonRepository
  implements Omit<Repository<PersonEntityProps, PersonEntity>, 'fetchAll'>
{
  abstract create(person: PersonEntity): Promise<PersonEntity>
  abstract update(person: PersonEntity): Promise<PersonEntity>
  abstract delete(id: string): Promise<void>
  abstract fetch(
    page?: number,
    perPage?: number,
    name?: string,
    email?: string,
    document?: string
  ): Promise<{ count: number; persons: PersonEntity[] }>
  abstract fetchById(id: string): Promise<PersonEntity>
}
