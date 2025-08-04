import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { ResponseApi } from '../@types'
import { Person } from './@types'

export type GetPersonByIdParams = {
  personId: string
}

const getPersonById = async (
  params: GetPersonByIdParams
): Promise<ResponseApi<Person>> => {
  const { data } = await api.get<Person>(`/persons/show/${params.personId}`)

  return {
    value: data,
  }
}

export const useGetPerson = (
  params: GetPersonByIdParams,
  options?: Partial<UseQueryOptions<ResponseApi<Person>, Error>>
): UseQueryResult<ResponseApi<Person>, Error> =>
  useQuery<ResponseApi<Person>, Error>({
    queryKey: ['get-person-by-id', params.personId],
    queryFn: () => getPersonById(params),
    ...options,
  })
