import { PersonEntity } from '@/person/domain/person.entity'
import { Document } from '@/person/domain/value-objects/document.value-object'
import { PersonInMemoryRepository } from '@/person/infrastructure/database/in-memory/repositories/person-in-memory-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { DeletePersonUseCase } from '../delete-person.usecase'

let sut: DeletePersonUseCase
let repo: PersonInMemoryRepository

beforeAll(() => {
  repo = new PersonInMemoryRepository()
  sut = new DeletePersonUseCase(repo)
})

describe('DeletePersonUseCase unit test', () => {
  it('should throw an error if the persons not exist', async () => {
    const result = await sut.execute({ id: 'id-not-exist' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able delete a person', async () => {
    repo.persons.push(
      new PersonEntity({
        birthDate: new Date(),
        document: new Document('878.013.980-92'),
        name: 'name test',
      })
    )

    await sut.execute({ id: repo.persons[0].id })

    expect(repo.persons.length === 0).toBeTruthy()
  })
})
