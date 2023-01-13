import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDrawerContext } from 'shared'
import { Dashboard, CityListing, PeopleListing } from '../pages'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Pagina Inicial',
      },
      {
        icon: 'people',
        path: '/people',
        label: 'Pessoas',
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades',
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/people' element={<PeopleListing />} />
      <Route path='/cities' element={<CityListing />} />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
