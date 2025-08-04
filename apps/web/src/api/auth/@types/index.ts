export type AuthenticateParams = {
  email: string
  password: string
}

export type AuthenticateStoreResponseApi = {
  user: User
  access_token: string
}

export type User = {
  id: string
  name: string
  email: string
}
