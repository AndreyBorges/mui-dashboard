import { FC, useEffect, useState } from 'react'

import { LocaleContext } from '.'
import { ILocaleProvider } from '..'

const DrawerProvider: FC<ILocaleProvider> = ({ children }) => {
  const [locale, setLocale] = useState<'en' | 'pt'>('pt')
  useEffect(() => {
    document.title = locale === 'en' ? 'Registrations' : 'Cadastros'
  }, [locale])
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
export default DrawerProvider
