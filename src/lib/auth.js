export function setToken(token) {
  window.localStorage.setItem('token', token)
}

export function getToken() {
  return window.localStorage.getItem('token')
}

export function removeToken() {
  window.localStorage.removeItem('token')
}

function getPayload() {
  const token = getToken()
  console.log('token: ', token)

  if (!token) return false
  const parts = token.split('.')
  console.log('parts: ', parts)
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  console.log('payload: ', payload)
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  console.log('now: ', now)
  return now < payload.exp
}

export function isOwner(userId) {
  const payload = getPayload()
  console.log('payload: ', payload)
  if (!isAuthenticated()) return false
  return payload.sub === userId
}