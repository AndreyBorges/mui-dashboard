import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { ThemeProviderApp } from './shared'

export const App = () => {
  return (
    <ThemeProviderApp>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProviderApp>
  )
}
