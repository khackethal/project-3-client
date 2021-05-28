import axios from 'axios'
import { getToken } from '../lib/auth'

export const baseUrl = '/api'
export const registerPath = '/register'
export const loginPath = '/login'
export const checkUserPath = '/checkuser'
export const memoriesPath = '/memories'


export function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getAllMemories() {
  return axios.get(`${baseUrl}${memoriesPath}`)
}
export function getSingleMemory(memoryId) {
  return axios.get(`${baseUrl}${memoriesPath}${memoryId}`)
}
export function createMemory(formdata) {
  return axios.post(`${baseUrl}${memoriesPath}`, formdata, headers())
}
export function editMemory(id, formdata) {
  return axios.put(`${baseUrl}${memoriesPath}${id}`, formdata, headers())
}
export function deleteMemory(id) {
  return axios.delete(`${baseUrl}${memoriesPath}${id}`, headers())
}


// * Authentication Requests
export function registerUser(formdata) {
  return axios.post(`${baseUrl}${registerPath}`, formdata)
}
export function loginUser(formdata) {
  return axios.post(`${baseUrl}${loginPath}`, formdata)
}
export function userCheck(formData) {
  return axios.post(`${baseUrl}${registerPath}${checkUserPath}`, formData)
}
