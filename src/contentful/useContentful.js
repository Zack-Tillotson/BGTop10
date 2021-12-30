
import {useRecoilState} from 'recoil'
import accessTokenAtom from './atoms/accessToken'
import creatorFormAtom from './atoms/creatorForm'
import {storeAccessToken} from './util'

function useContentful() {
  const [accessToken, setAccessTokenState] = useRecoilState(accessTokenAtom)
  const [creatorForm, setCreatorForm] = useRecoilState(creatorFormAtom)

  const handleAccessTokenChange = value => {
    setAccessTokenState(value)
    storeAccessToken(value)
  }

  const handleCreatorFormChange = (formName) => (field, value) => {
    setCreatorForm({...creatorForm, [field.id]: value})
  }

  return {
    accessToken,
    handleAccessTokenChange,
    forms: {
      creator: {
        values: creatorForm,
        handleChange: handleCreatorFormChange,
      },
    },
  }
}

export default useContentful