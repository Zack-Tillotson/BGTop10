const ACCESS_TOKEN_NAME = 'contentful-access-token'
const CREATOR_FORM_NAME = 'contentful-creator-form'

export const getStoredAccessToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_NAME) || ''
  } catch(e) {
    return ''
  }
}

export const storeAccessToken = (value = '') => {
  localStorage.setItem(ACCESS_TOKEN_NAME, value)
}

export const storeCreatorForm = (value = {}) => {
  localStorage.setItem(CREATOR_FORM_NAME, JSON.stringify(value))
}

export const getStoredCreatorForm = () => {
  try {
    return JSON.parse(localStorage.getItem(CREATOR_FORM_NAME) || "{}")
  } catch(e) {
    return {}
  }
}