import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDrawerContext } from 'shared'
import { t } from 'lang'
import { Dashboard, CitiesListing, PeopleListing, PeapleDetails, CitiesDetails } from '../pages'

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext()
  const home = t('sidebar.home')
  const people = t('sidebar.people')
  const cities = t('sidebar.cities')

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: home
      },
      {
        icon: 'people',
        path: '/people',
        label: people
      },
      {
        icon: 'location_city',
        path: '/cities',
        label: cities
      }
    ])
  }, [home, people, cities])

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
