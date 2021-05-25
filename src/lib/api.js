import axios from 'axios'

const baseUrl = '/api'
const registerPath = '/register'
const loginPath = '/login'
const checkUserPath = '/checkuser'

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