import { PersonEntity } from '@/person/domain/person.entity'
import { Document } from '@/person/domain/value-objects'
import { PersonInMemoryRepository } from '@/person/infrastructure/database/in-memory/repositories/person-in-memory-repository'
import { ResourceNotFoundError } from '../../errors'
import { UpdatePersonUseCase } from '../update-person.usecase'

let sut: UpdatePersonUseCase
let repo: PersonInMemoryRepository

beforeAll(() => {
  repo = new PersonInMemoryRepository()
  sut = new UpdatePersonUseCase(repo)
})

describe('UpdatePersons unit test', () => {
  it('should throw an error if the persons not exist', async () => {
    const result = await sut.execute({
      id: 'id-not-exist',
      name: 'new name',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able update the persons name', async () => {
    repo.persons.push(
      new PersonEntity({
        birthDate: new Date(),
        name: 'name test',
        document: new Document('878.013.980-92'),
      })
    )

    await sut.execute({ id: repo.persons[0].id, name: 'new name' })

    expect(repo.persons[0].name).toEqual('new name')
  })
})
