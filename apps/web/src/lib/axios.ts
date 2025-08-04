import axios from 'axios'

import { env } from '@/env'
import { getValue } from '@/utils'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(config), Math.round(Math.random() * 3000))
    })
  })
}

api.interceptors.request.use(
  (config) => {
    const accessToken = getValue<string>('access_token@stefanini-group')
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
