import { createContext, useContext } from 'react'
import { IDrawerContextData } from 'shared/contexts'

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

export default DrawerContext
