import { PersonInMemoryRepository } from '@/person/infrastructure/database/in-memory/repositories/person-in-memory-repository'
import { MissingFieldError } from '../../errors'
import { CreatePersonUseCase } from '../create-person.usecase'

let sut: CreatePersonUseCase
let repo: PersonInMemoryRepository

beforeAll(() => {
  repo = new PersonInMemoryRepository()
  sut = new CreatePersonUseCase(repo)
})

describe('CreatePersonUseCase Unit Test', () => {
  it('should be able create a person with correct properties', async () => {
    const result = await sut.execute({
      birthDate: new Date(),
      document: '575.359.890-04',
      name: 'Jhon Doe',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const { person } = result.value
      expect(person).toHaveProperty('id')
      expect(person.createdAt).toBeInstanceOf(Date)
    }
  })

  it('should throw an error if the name is empty', async () => {
    const result = await sut.execute({
      name: '',
      birthDate: new Date(),
      document: '575.359.890-04',
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(MissingFieldError)
  })

  it('should throw an error if the birthDate is empty', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      birthDate: null,
      document: '575.359.890-04',
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(MissingFieldError)
  })

  it('should throw an error if the document is empty', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      birthDate: new Date(),
      document: null,
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(MissingFieldError)
  })
})
