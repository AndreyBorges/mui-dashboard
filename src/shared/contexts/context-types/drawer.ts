import { ReactNode } from 'react'

export interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
}

export interface IDrawerProviderProps {
  children: ReactNode
}
