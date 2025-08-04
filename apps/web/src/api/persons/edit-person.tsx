import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

import { Person } from './@types'

export type EditPersonBody = {
  personId: string
  name?: string
  email?: string
  gender?: string
  birthDate?: Date
  birthplace?: string
  nationality?: string
}

export const editPerson = async (body: EditPersonBody): Promise<Person> => {
  const { data } = await api.put<Person>(`/persons/${body.personId}`, {
    name: body.name,
    email: body.email,
    gender: body.gender,
    birthDate: body.birthDate,
    birthplace: body.birthplace,
    nationality: body.nationality,
  })
  return data
}

export const useEditPerson = (
  options?: UseMutationOptions<Person, AxiosError, EditPersonBody>
) =>
  useMutation<Person, AxiosError, EditPersonBody>({
    mutationKey: ['edit-person'],
    mutationFn: async (body) => await editPerson(body),
    ...options,
  })
