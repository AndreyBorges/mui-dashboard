import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { ThemeProviderApp } from 'shared'
import { MenuLateral } from 'shared/components'

export const App = () => {
  return (
    <ThemeProviderApp>
      <BrowserRouter>
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      </BrowserRouter>
    </ThemeProviderApp>
  )
}
