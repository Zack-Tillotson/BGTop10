import {TagSummary, GameList} from 'board-game-ui'
import {useTagData} from 'board-game-data'

export interface TagProps {
  tagSlug: string,
}

export async function Tag({tagSlug}: TagProps) {
  const data = await useTagData(tagSlug)
  return (
    <div>
      <TagSummary {...data.tag} /> 
      <GameList games={data.games} /> 
    </div>
  )
}

export default Tag;
