import { PersonInMemoryRepository } from '@/person/infrastructure/database/in-memory/repositories/person-in-memory-repository'
import { makePerson } from '@/test/factories'
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
    const newPerson = makePerson()
    repo.persons.push(newPerson)

    await sut.execute({ id: repo.persons[0].id, name: 'new name' })

    expect(repo.persons[0].name).toEqual('new name')
  })
})
