import { FC, useCallback, useState } from 'react'

import { IDrawerProviderProps } from 'shared/contexts'

import { DrawerContext } from '.'

const DrawerProvider: FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(prevDrawerOpen => !prevDrawerOpen)
  }, [])

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}
export default DrawerProvider
