import 'shared/forms/translations-yup'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { DrawerProvider, ThemeProviderApp, AuthProvider, useLocaleContext } from 'shared/contexts'
import { Login, Sidebar } from 'shared/components'
import 'react-toastify/dist/ReactToastify.css'
import { IntlProvider } from 'react-intl'
import { flattenMessages, en, pt } from 'lang'

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
