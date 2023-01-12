import { ReactNode } from 'react'

export interface IMenuLateralProps {
  children: ReactNode
}

export interface IListItemLinkProps {
  children?: NodeModule
  label: string
  icon: string
  to: string
  onClick?: () => void
}
