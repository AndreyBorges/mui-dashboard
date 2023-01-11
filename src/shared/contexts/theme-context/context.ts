import { createContext, useContext } from 'react'
import { IThemeContextAppData } from 'shared/contexts'


const ThemeContextApp = createContext({} as IThemeContextAppData)

export const useAppThemeContext = () => {
  return useContext(ThemeContextApp)
}

export default ThemeContextApp
