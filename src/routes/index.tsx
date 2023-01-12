import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDrawerContext } from 'shared'
import { Dashboard } from '../pages'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Pagina Inicial',
        path: '/home'
      },
      {
        icon: 'settings',
        label: 'Settings',
        path: '/settings'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/settings' element={<h1>Dashboard</h1>} />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
