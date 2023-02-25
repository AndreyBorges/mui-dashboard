import { ReactNode } from 'react'

export interface ILocaleContextData {
  locale: 'en' | 'pt'
  setLocale: React.Dispatch<React.SetStateAction<'pt' | 'en'>>
}

export interface ILocaleProvider {
  children: ReactNode
}
