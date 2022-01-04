import useCreator from 'contentful/useCreator'

function useCreatorSelector() {
  const {cmsList: list} = useCreator(true)
  return {list}
}

export default useCreatorSelector