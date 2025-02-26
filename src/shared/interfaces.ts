export interface User {
  id: number
  mark: null | string
  type: string
  login: string
  password: null | string
}

export interface UserLocalStorage {
  id: number
  mark: null | { text: string }[]
  type: string
  login: string
  password: string | null
}