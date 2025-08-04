import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { ResponseApi } from '../@types'
import { Person } from './@types'

export type DeletePersonParams = {
  personId: string
}

export const deletePerson = async (
  body: DeletePersonParams
): Promise<ResponseApi<Person>> => {
  const { data } = await api.delete<Person>(`/persons/${body.personId}`)
  return { value: data }
}

export const useDeletePerson = (
  options?: UseMutationOptions<
    ResponseApi<Person>,
    AxiosError,
    DeletePersonParams
  >
) =>
  useMutation<ResponseApi<Person>, AxiosError, DeletePersonParams>({
    mutationKey: ['delete-person'],
    mutationFn: async (body) => await deletePerson(body),
    ...options,
  })
