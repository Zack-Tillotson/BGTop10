import slugify from 'slugify'
import {useRecoilState} from 'recoil'
import accessTokenAtom from './atoms/accessToken'
import creatorFormAtom from './atoms/creatorForm'
import {storeAccessToken, storeCreatorForm} from './util'
import {newCreator} from './cms'

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
    return newCreator(accessToken, creatorForm)
      .then(() => {
        handleCreatorFormClear()
        return true
      })
      .catch(e => {
        console.log(e)
        return false
      })
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