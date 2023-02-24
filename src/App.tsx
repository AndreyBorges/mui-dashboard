import 'shared/forms/translations-yup'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { DrawerProvider, ThemeProviderApp, AuthProvider } from 'shared/contexts'
import { Login, Sidebar } from 'shared/components'
import 'react-toastify/dist/ReactToastify.css'
import { IntlProvider } from 'react-intl'
import { flattenMessages, en, pt } from 'lang'
import { useState } from 'react'

const messages = {
  pt,
  en
}

export const App = () => {
  const [locale, setLocale] = useState<'en' | 'pt'>('pt')
  document.title = locale === 'en' ? 'Registrations' : 'Cadastros'

  return (
    <IntlProvider locale='en' defaultLocale='en' messages={flattenMessages(messages[locale])}>
      <AuthProvider>
        <ThemeProviderApp>
          <Login>
            <DrawerProvider>
              <BrowserRouter>
                <Sidebar {...{ locale }} changeLocale={setLocale}>
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
