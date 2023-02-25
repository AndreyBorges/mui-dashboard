import { createContext, useContext } from 'react'
import { ILocaleContextData } from 'shared/contexts'

const LocaleContext = createContext({} as ILocaleContextData)

export const useLocaleContext = () => {
  return useContext(LocaleContext)
}

export default LocaleContext
