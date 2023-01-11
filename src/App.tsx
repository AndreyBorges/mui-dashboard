import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { DrawerProvider, ThemeProviderApp } from 'shared/contexts'
import { MenuLateral } from 'shared/components'

export const App = () => {
  return (
    <ThemeProviderApp>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </ThemeProviderApp>
  )
}
