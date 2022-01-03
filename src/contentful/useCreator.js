import slugify from 'slugify'
import {creatEntryCreator} from './cms'
import useAccessToken from './useAccessToken'

function useCreator() {
  const accessToken = useAccessToken()

  const newCreator = (creatorValue) => {
    return newCreator(accessToken.value, creatorValue)
      .then(() => {
        return true
      })
      .catch(e => {
        console.log(e)
        return false
      })
  }

  return {
    newCreator,
  }
}

export default useCreator