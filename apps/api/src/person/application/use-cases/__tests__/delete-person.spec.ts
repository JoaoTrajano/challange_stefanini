import { PersonInMemoryRepository } from '@/person/infrastructure/database/in-memory/repositories/person-in-memory-repository'
import { makePerson } from '@/test/factories'
import { DeletePersonUseCase } from '../delete-person.usecase'
import { ResourceNotFoundError } from '@/shared/application/errors'

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
    const newPerson = makePerson()
    repo.persons.push(newPerson)

    await sut.execute({ id: repo.persons[0].id })

    expect(repo.persons.length === 0).toBeTruthy()
  })
})
