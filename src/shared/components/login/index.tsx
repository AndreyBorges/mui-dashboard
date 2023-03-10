import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material'
import { FC, useState } from 'react'
import { useAuthContext } from 'shared/contexts'
import { LoginProps } from '..'

import { T } from 'lang'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5)
})

const Login: FC<LoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const title = T('login.title')
  const emailLabel = T('login.email')
  const passwordLabel = T('login.password')
  const loginBtn = T('login.button')

  const handleSubmit = () => {
    setIsLoading(true)
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then(validatedData => {
        login(validatedData.email, validatedData.password).then(() => {
          setIsLoading(false)
          setEmail('')
          setPassword('')
        })
      })
      .catch((err: yup.ValidationError) => {
        setIsLoading(false)
        err.inner.forEach(error => {
          switch (error.path) {
            case 'email':
              setEmailError(error.message)
              return
            case 'password':
              setPasswordError(error.message)
              return
          }
        })
      })
  }

  if (isAuthenticated) return <>{children}</>
  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>
              {title}
            </Typography>

            <TextField
              fullWidth
              value={email}
              error={!!emailError}
              helperText={emailError}
              label={emailLabel}
              disabled={isLoading}
              onChange={({ target }) => {
                setEmail(target.value)
              }}
              onKeyDown={() => {
                setEmailError('')
              }}
            />
            <TextField
              fullWidth
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              label={passwordLabel}
              disabled={isLoading}
              type='password'
              onChange={({ target }) => {
                setPassword(target.value)
              }}
              onKeyDown={e => {
                setPasswordError('')
              }}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              variant='contained'
              color='primary'
              disabled={isLoading}
              onClick={handleSubmit}
              sx={{ width: '90px', height: '38px' }}
            >
              {isLoading ? (
                <CircularProgress variant='indeterminate' color='inherit' size={20} />
              ) : (
                loginBtn
              )}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
