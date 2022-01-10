import slugify from 'slugify'
import usePersistentState from 'usePersistentState'

const STATE_NAME = 'contentful-creator-form'
const DEFAULT_VALUE = {}

function useCreatorForm() {
  const formState = usePersistentState(STATE_NAME, DEFAULT_VALUE)

  const hydrateForm = creator => {
    if(!creator) return
    formState.updateValue({
      name: creator.name,
      slug: creator.slug,
      description: creator.description.description,
      avatar: creator.imageAvatar,
      banner: creator.imageBanner,
      links: creator.link.join(', '),
    })
  }

  const handleCreatorFormChange = (field, value) => {
    const newValue = {...formState.value, [field.id]: value}

    if(field.id === 'name') {
      newValue.slug = slugify(value, {lower: true})
    }
    formState.updateValue(newValue)
  }

  const handleCreatorFormClear = () => {
    formState.updateValue(DEFAULT_VALUE)
  }

  return {
    value: formState.value,

    hydrate: hydrateForm,

    handleChange: handleCreatorFormChange,
    handleClear: handleCreatorFormClear,
  }
}

export default useCreatorForm