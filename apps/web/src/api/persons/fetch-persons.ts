import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { ResponseApi } from '../@types'
import { Person } from './@types'

export type FetchPersonParams = {
  name?: string | null
  email?: string | null
  document?: string | null
}

export const fetchPersons = async ({
  document,
  email,
  name,
}: FetchPersonParams): Promise<ResponseApi<Person[]>> => {
  const { data } = await api.get<{ persons: Person[] }>('/persons', {
    params: {
      document,
      email,
      name,
    },
  })

  return {
    value: data.persons,
  }
}

export const useFetchPersons = (
  params: FetchPersonParams,
  options?: UseQueryOptions<ResponseApi<Person[]>, Error>
) =>
  useQuery<ResponseApi<Person[]>, Error>({
    queryKey: ['fetch-persons', params],
    queryFn: () => fetchPersons(params),
    ...options,
  })
