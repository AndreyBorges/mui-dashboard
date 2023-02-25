import 'shared/forms/translations-yup'
import { en, flattenMessages, pt } from 'lang'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { AppRoutes } from 'routes'
import { Login, Sidebar } from 'shared/components'
import { AuthProvider, DrawerProvider, ThemeProviderApp, useLocaleContext } from 'shared/contexts'

const messages = {
  pt,
  en
}

export const App = () => {
  const { locale } = useLocaleContext()

  return (
    <IntlProvider locale='en' defaultLocale='en' messages={flattenMessages(messages[locale])}>
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
    </IntlProvider>
  )
}
