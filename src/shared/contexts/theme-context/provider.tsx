import { Box, ThemeProvider } from '@mui/material'
import { FC, useCallback, useMemo, useState } from 'react'

import { IThemeProviderAppProps } from 'shared/contexts'
import { DarkTheme, LightTheme } from 'shared/themes'
import { ThemeContextApp } from '.'

const ThemeProviderApp: FC<IThemeProviderAppProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')
  const toggleTheme = useCallback(() => {
    setThemeName(prevThemeName => (prevThemeName === 'light' ? 'dark' : 'light'))
  }, [])

  const theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme
  }, [themeName])
  return (
    <ThemeContextApp.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContextApp.Provider>
  )
}
export default ThemeProviderApp
