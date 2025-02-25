export interface User {
  id?: number
  mark: null | string
  type: string
  login: null | string
  password: null | string
}

export interface UserToSave {
  id: number
  mark: null | string
  type: string
  login: string
  password: string | null
}