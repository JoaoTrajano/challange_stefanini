import axios from 'axios'

import { env } from '@/env'

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
