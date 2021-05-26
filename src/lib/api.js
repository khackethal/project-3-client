import axios from 'axios'
import { getToken } from './auth'

const baseUrl = 'mongodb://localhost/memorymapdb'
function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}
export function getAllMemories() {
  return axios.get(`${baseUrl}/memories`)
}

export function getSingleMemory(memoryId) {
  return axios.get(`${baseUrl}/memories/${memoryId}`)
}

export function createMemory(formdata) {
  return axios.post(`${baseUrl}/memories`, formdata, headers())
}

export function editMemory(id, formdata) {
  return axios.put(`${baseUrl}/memories/${id}`, formdata, headers())
}

export function deleteCheese(id) {
  return axios.delete(`${baseUrl}/memories/${id}`, headers())
}


// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

