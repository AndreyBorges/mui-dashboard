import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { DrawerProvider, ThemeProviderApp } from 'shared/contexts'
import { Sidebar } from 'shared/components'

export const App = () => {
  return (
    <ThemeProviderApp>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </ThemeProviderApp>
  )
}
