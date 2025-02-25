export interface User {
  mark: null | string
  type: string
  login: null | string
  password: null | string
}

export interface UserToSave {
  mark: null | string
  type: string
  login: string
  password: string | null
}