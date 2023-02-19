import { ReactNode } from 'react'

export interface IAuthContextData {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<string | void>
  logout: () => void
}

export interface IAuthProviderProps {
  children: ReactNode
}
