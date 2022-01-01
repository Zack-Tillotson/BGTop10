import slugify from 'slugify'
import {useRecoilState} from 'recoil'
import accessTokenAtom from './atoms/accessToken'
import creatorFormAtom from './atoms/creatorForm'
import {storeAccessToken, storeCreatorForm} from './util'

function useContentful() {
  const [accessToken, setAccessTokenState] = useRecoilState(accessTokenAtom)
  const [creatorForm, setCreatorForm] = useRecoilState(creatorFormAtom)

  const handleAccessTokenChange = value => {
    setAccessTokenState(value)
    storeAccessToken(value)
  }

  const handleCreatorFormChange = (field, value) => {
    const newValue = {...creatorForm, [field.id]: value}

    if(field.id === 'name') {
      newValue.slug = slugify(value, {lower: true})
    }
    setCreatorForm(newValue)
    storeCreatorForm(newValue)
  }

  const handleCreatorFormClear = () => {
    setCreatorForm({})
    storeCreatorForm({})
  }

  const handleCreatorFormSubmit = () => {
    // Create creator in CMS
  }

  return {
    accessToken,
    handleAccessTokenChange,
    forms: {
      creator: {
        values: creatorForm,
        handleChange: handleCreatorFormChange,
        handleClear: handleCreatorFormClear,
        handleSubmit: handleCreatorFormSubmit,
      },
    },
  }
}

export default useContentful