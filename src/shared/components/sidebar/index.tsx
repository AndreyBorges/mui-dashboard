import {
  Avatar, Box, Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { T } from 'lang'
import { FC } from 'react'
import { ISidebarProps } from 'shared/components/components-types'
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useLocaleContext
} from 'shared/contexts'
import ListItemLink from './list-item-link'

const Sidebar: FC<ISidebarProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { locale, setLocale } = useLocaleContext()
  const language = T('sidebar.language')
  const lightTheme = T('sidebar.light')
  const darkTheme = T('sidebar.dark')
  const logoutText = T('sidebar.logout')

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()

  const { toggleTheme, themeName } = useAppThemeContext()
  const { logout } = useAuthContext()

  const handleClick = () => {
    toggleTheme()
  }

  const changeLanguage = () => {
    setLocale(locale === 'pt' ? 'en' : 'pt')
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
              <ListItemButton onClick={changeLanguage}>
                <ListItemIcon>
                  <Icon>language</Icon>
                </ListItemIcon>
                <ListItemText primary={language} />
              </ListItemButton>

              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>

                <ListItemText primary={themeName === 'light' ? darkTheme : lightTheme} />
              </ListItemButton>

              <Divider />

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary={logoutText} />
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

export default Sidebar
