import axios from 'axios'
import { Environment } from 'shared/environment'
import { errorInterceptor, successInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

Api.interceptors.response.use(
  response => successInterceptor(response),
  error => errorInterceptor(error)
)

export { Api }
