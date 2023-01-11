import { ReactNode } from 'react'

export interface IThemeContextAppData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

export interface IThemeProviderAppProps {
  children: ReactNode
}
