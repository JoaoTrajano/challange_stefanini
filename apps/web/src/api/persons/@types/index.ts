export type Person = {
  id: string
  name: string
  gender?: string | null
  email?: string | null
  birthDate: Date
  birthplace?: string | null
  nationality?: string | null
  document: string
  createdAt: Date
  updatedAt: Date
}
