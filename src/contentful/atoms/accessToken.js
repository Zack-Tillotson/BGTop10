import {atom} from 'recoil'
import {getStoredAccessToken} from 'contentful/util'

export default atom({
  key: `contentful-access-token`,
  default: getStoredAccessToken(),
});