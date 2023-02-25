import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { AuthService } from 'shared/services/api/auth'
import { AuthContext } from '.'
import { IAuthProviderProps } from '..'

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
  const [accessToken, setAccessToken] = useState<string>()

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)
    if (token) {
      setAccessToken(JSON.parse(token))
    } else {
      setAccessToken(undefined)
    }
  }, [])

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password)
    if (result instanceof Error) {
      return result.message
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken))
      setAccessToken(result.accessToken)
    }
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)
    setAccessToken(undefined)
  }, [])

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
