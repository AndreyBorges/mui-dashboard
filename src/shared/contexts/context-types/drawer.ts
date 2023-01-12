import { ReactNode } from 'react'

export interface IDrawerContextData {
  isDrawerOpen: boolean
  drawerOptions: IDrawerOption[]
  toggleDrawerOpen: () => void
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

export interface IDrawerProviderProps {
  children: ReactNode
}

export interface IDrawerOption {
  icon: string
  path: string
  label: string
}
