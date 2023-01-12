import { FC, useCallback, useState } from 'react'

import { IDrawerOption, IDrawerProviderProps } from 'shared/contexts'

import { DrawerContext } from '.'

const DrawerProvider: FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([])
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
export default DrawerProvider
