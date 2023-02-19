import { createContext, useContext } from 'react'
import { IAuthContextData } from 'shared/contexts'

const AuthContext = createContext({} as IAuthContextData)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default AuthContext
