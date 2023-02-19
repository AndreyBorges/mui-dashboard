import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDrawerContext } from 'shared'
import { Dashboard, CitiesListing, PeopleListing, PeapleDetails, CitiesDetails } from '../pages'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Pagina Inicial'
      },
      {
        icon: 'people',
        path: '/people',
        label: 'Pessoas'
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades'
      }
    ])
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Dashboard />} />
      <Route path='/people' element={<PeopleListing />} />
      <Route path='/people/details/:id' element={<PeapleDetails />} />
      <Route path='/cities' element={<CitiesListing />} />
      <Route path='/cities/details/:id' element={<CitiesDetails />} />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
