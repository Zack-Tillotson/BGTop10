const ACCESS_TOKEN_NAME = 'contentful-access-token'

export const getStoredAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_NAME) || ''
}

export const storeAccessToken = (value = '') => {
  localStorage.setItem(ACCESS_TOKEN_NAME, value)
}