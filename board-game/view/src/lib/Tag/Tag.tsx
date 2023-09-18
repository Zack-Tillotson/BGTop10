import {TagTitle, GameList, PageContent} from 'board-game-ui'
import {useTagData} from 'board-game-data'

export interface TagProps {
  tagSlug: string,
}

export async function Tag({tagSlug}: TagProps) {
  const data = await useTagData(tagSlug)
  return (
    <PageContent
      title={data.tag.pageTitle}
      subtitle={data.tag.pageSubtitle}
    >
      <TagTitle {...data.tag} /> 
      <GameList gamesList={data.gamesList} /> 
    </PageContent>
  )
}

export default Tag;
