import axios from 'axios'
import getToken from '../lib/auth'

const baseUrl = '/api'
const registerPath = '/register'
const loginPath = '/login'
const checkUserPath = '/checkuser'

// export function headers() {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   }
// }

// * authentication requests
export function registerUser(formData) {
  return axios.post(`${baseUrl}${registerPath}`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}${loginPath}`, formData)
}

export function userCheck(formData) {
  return axios.post(`${baseUrl}${registerPath}${checkUserPath}`, formData)
}