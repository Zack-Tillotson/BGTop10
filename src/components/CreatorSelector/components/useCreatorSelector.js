import useCreator from 'contentful/useCreator'

function useCreatorSelector() {
  const {cmsList: list, contentfulList} = useCreator(true)
  return {list, contentfulList}
}

export default useCreatorSelector