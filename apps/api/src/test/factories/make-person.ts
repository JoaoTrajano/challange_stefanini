import { PersonEntity, PersonEntityProps } from '@/person/domain/person.entity'
import { Document } from '@/person/domain/value-objects'

export function makePerson(
  override: Partial<PersonEntityProps> = {}
): PersonEntity {
  const person = PersonEntity.create({
    document: override.document ?? new Document('53145606077'),
    name: override.name ?? 'John Doe',
    birthDate: override.birthDate ?? new Date('1990-01-01'),
    ...override,
  })

  return person
}
