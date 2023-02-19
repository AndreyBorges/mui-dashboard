import 'shared/forms/translations-yup'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { DrawerProvider, ThemeProviderApp, AuthProvider } from 'shared/contexts'
import { Login, Sidebar } from 'shared/components'

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProviderApp>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </ThemeProviderApp>
    </AuthProvider>
  )
}
