import { Repository } from '@/shared/infrastructure/database/repository.inteface'
import { PersonEntity } from '../person.entity'

export abstract class PersonRepository
  implements Omit<Repository<PersonEntity>, 'fetchAll'>
{
  abstract create(person: PersonEntity): Promise<PersonEntity>
  abstract update(person: PersonEntity): Promise<PersonEntity>
  abstract delete(id: string): Promise<void>
  abstract fetch(
    name?: string,
    email?: string,
    cpf?: string
  ): Promise<PersonEntity[]>
  abstract fetchById(id: string): Promise<PersonEntity>
}
