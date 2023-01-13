import axios from 'axios'
import { errorInterceptor, successInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json'
  }
})

Api.interceptors.response.use(
  response => successInterceptor(response),
  error => errorInterceptor(error)
)

export { Api }
