import slugify from 'slugify'
import usePersistentState from 'usePersistentState'

const STATE_NAME = 'contentful-creator-form'
const DEFAULT_VALUE = {}

function useCreatorForm() {
  const formState = usePersistentState(STATE_NAME, DEFAULT_VALUE)

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
    handleChange: handleCreatorFormChange,
    handleClear: handleCreatorFormClear,
  }
}

export default useCreatorForm