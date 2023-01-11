import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/home' element={<h1>Ola</h1>} />
      <Route path='*' element={<Navigate to='home' />} />
    </Routes>
  )
}
