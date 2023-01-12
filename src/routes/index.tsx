import { Button } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppThemeContext, useDrawerContext } from 'shared'

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/home'
      },
      {
        icon: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route
        path='/home'
        element={
          <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>
            TOGGLE THEME AND DRAWER
          </Button>
        }
      />
      <Route path='/dashboard' element={<h1>Dashboard</h1>} />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
