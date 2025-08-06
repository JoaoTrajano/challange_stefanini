import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { ResponseApi } from '../@types'
import { User } from './@types'

export type AccountResponseApi = {
  id: number
  name: string
  email: string
}

export const account = async (): Promise<Omit<ResponseApi<User>, 'count'>> => {
  const { data } = await api.get<User>('/authentication/account')

  return {
    value: data,
  }
}

export const useAccount = (
  options?: UseQueryOptions<Omit<ResponseApi<User>, 'count'>, Error>
): UseQueryResult<Omit<ResponseApi<User>, 'count'>, Error> =>
  useQuery<Omit<ResponseApi<User>, 'count'>, Error>({
    queryKey: ['account'],
    queryFn: () => account(),
    enabled: true,
    ...options,
  })
