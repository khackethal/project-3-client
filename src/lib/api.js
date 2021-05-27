import axios from 'axios'
import { getToken } from './auth'

export const baseUrl = '/api'
export const registerPath = '/register'
export const loginPath = '/login'
export const checkUserPath = '/checkuser'
export const memoriesPath = '/memories'


// // * image upload 
// const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
// const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET


// // ! not sure this is meant to be here
// function ImageUploadField({ onChange, labelText, name, value }) {

//   const handleUpload = async event => {
//     const data = new FormData()
//     data.append('file', event.target.files[0])
//     data.append('upload_preset', uploadPreset)
//     const res = await axios.post(uploadUrl, data)
//     onChange({ target: { name, value: res.data.url } })
//   }
// }
// // !



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


// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}${registerPath}`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}${loginPath}`, formdata)
}

export function userCheck(formData) {
  return axios.post(`${baseUrl}${registerPath}${checkUserPath}`, formData)
}