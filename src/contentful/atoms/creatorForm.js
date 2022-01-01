import {atom} from 'recoil'
import {getStoredCreatorForm} from 'contentful/util'

export default atom({
  key: `contentful-creator-form`,
  default: getStoredCreatorForm(),
});