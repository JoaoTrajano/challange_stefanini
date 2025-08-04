import { toast } from 'sonner'
import { create } from 'zustand'

import { authenticate } from '@/api/auth'
import { User } from '@/api/user/@types'
import { removeValue, setValue } from '@/utils/local-storage'

export type SignInParams = { email: string; password: string }

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  signIn: (data: SignInParams, onSuccess: () => void) => Promise<void>
  signOut: (onSignOut: () => void) => void
  setUser: (user: User) => void
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: async (data: SignInParams, onSuccess) => {
    try {
      const result = await authenticate({
        email: data.email,
        password: data.password,
      })

      setValue<string>('access_token@stefanini-group', result.access_token)
      onSuccess()

      toast.success('Autenticação realizada com sucesso!')
    } catch (error) {
      toast.error('Nome de usuário ou senha estão incorretos!')
    }
  },
  signOut: (onSignOut) => {
    removeValue('access_token@stefanini-group')
    set({ isAuthenticated: false })

    onSignOut()
  },
  setUser: (user) => {
    set({ user })
  },
}))
