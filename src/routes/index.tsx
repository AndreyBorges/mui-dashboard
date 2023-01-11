import { Button } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppThemeContext, useDrawerContext } from 'shared'

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext()
  const { toggleDrawerOpen } = useDrawerContext()

  const handleClick = () => {
    toggleTheme()
    toggleDrawerOpen()
  }
  return (
    <Routes>
      <Route
        path='/home'
        element={
          <Button variant='contained' color='primary' onClick={handleClick}>
            TOGGLE THEME AND DRAWER
          </Button>
        }
      />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
