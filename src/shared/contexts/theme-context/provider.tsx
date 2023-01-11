import { ThemeProvider } from '@mui/material'
import { FC, ReactNode, useCallback, useMemo, useState } from 'react'

import { ThemeContextApp } from './'
import { Box } from '@mui/system'
import { LightTheme,DarkTheme } from '../../themes'

interface ThemeProviderAppProps {
  children: ReactNode
}

const ThemeProviderApp: FC<ThemeProviderAppProps> = ({ children }) => {
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
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContextApp.Provider>
  )
}
export default ThemeProviderApp
