import { FetchPersonUseCaseOutput } from '@/person/application/use-cases'
import { PersonEntity } from '@/person/domain/person.entity'

export class PersonPresenter {
  static mapPersonsFromOutput(output: FetchPersonUseCaseOutput) {
    if (output.isRight())
      return {
        persons: output.value.persons.map(PersonPresenter.mapPersonFromInput),
        count: output.value.count,
      }

    return {
      persons: [],
      count: 0,
    }
  }

  static mapPersonFromInput(person: PersonEntity) {
    return {
      ...person.props,
      id: person.id,
      document: person.props.document.format(),
      email: person.email,
      createdAt: person.createdAt,
    }
  }
}
