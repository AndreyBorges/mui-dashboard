import { createContext, useContext } from 'react'

interface IThemeContextAppData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}
const ThemeContextApp = createContext({} as IThemeContextAppData)

export const useAppThemeContext = () => {
  return useContext(ThemeContextApp)
}

export default ThemeContextApp
