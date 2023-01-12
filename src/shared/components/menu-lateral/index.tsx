import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Box } from '@mui/material'
import { FC } from 'react'
import { IMenuLateralProps } from 'shared/components/components-types'
import { useAppThemeContext, useDrawerContext } from 'shared/contexts'
import ListItemLink from './list-item-link'

const MenuLateral: FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

  const { toggleTheme, themeName } = useAppThemeContext()

  const handleClick = () => { 
    toggleTheme()
    console.log(themeName)
  }

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box
            width='100%'
            height={theme.spacing(20)}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Avatar
              src='https://github.com/AndreyBorges.png'
              alt='Usuario'
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
            />
          </Box>

          <Divider />
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(({ icon, label, path }) => (
                <ListItemLink
                  key={path}
                  {...{ icon, label }}
                  to={path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
            <List component='nav'>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary={themeName === 'light' ? 'Tema escuro' : 'Tema claro'} />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}

export default MenuLateral
