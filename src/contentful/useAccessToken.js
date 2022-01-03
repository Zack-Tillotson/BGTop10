import usePersistentState from 'usePersistentState'

const STATE_NAME = 'contentful-access-token'

function useAccessToken() {
  const {value, updateValue} = usePersistentState(STATE_NAME, '')
  
  return {
    value,
    updateValue,
  }
}

export default useAccessToken