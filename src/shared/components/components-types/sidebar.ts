import { ReactNode } from 'react'

export interface ISidebarProps {
  children: ReactNode
  locale: string
  changeLocale: React.Dispatch<React.SetStateAction<'pt' | 'en'>>
}

export interface IListItemLinkProps {
  children?: NodeModule
  label: string
  icon: string
  to: string
  onClick?: () => void
}
