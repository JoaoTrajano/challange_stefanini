import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { Person } from './@types'

export type CreateNewPersonParams = {
  name: string
  document: string
  birthDate: Date
  gender?: string
  email?: string
  birthplace?: string
  nationality?: string
}

export const createNewPerson = async (
  body: CreateNewPersonParams
): Promise<Person> => {
  const { data } = await api.post<Person>('/persons', body)
  return data
}

export const useCreateNewPerson = (
  options?: UseMutationOptions<Person, AxiosError, CreateNewPersonParams>
) =>
  useMutation<Person, AxiosError, CreateNewPersonParams>({
    mutationKey: ['create-new-person'],
    mutationFn: async (body) => await createNewPerson(body),
    ...options,
  })
