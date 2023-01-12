import { ListItemButton, ListItemIcon, Icon, ListItemText } from '@mui/material'
import { FC } from 'react'
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { IListItemLinkProps } from '../../components-types'

const ListItemLink: FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({
    path: resolvedPath.pathname,
    end: false
  })

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export default ListItemLink
