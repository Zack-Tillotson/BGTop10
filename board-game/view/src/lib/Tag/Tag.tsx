import {TagTitle, GameList, GameImageList} from 'board-game-ui'
import {takeTag, getDeterminantOption} from 'board-game-data'
import {PageContent} from 'core-ui'

import styles from './Tag.module.scss'

export interface TagProps {
  tagSlug: string,
}

type VARIANT_TYPE = 'A'|'B'|'C'|'D'
const VARIANTS = ['A', 'B', 'C', 'D']

export async function Tag({tagSlug}: TagProps) {
  const data = await takeTag(tagSlug, true)
  return (
    <PageContent
      title={data?.tag?.pageTitle || ''}
      subtitle={data?.tag?.pageSubtitle || ''}
    >
      <div className={styles.container}>
        <GameImageList
          className={styles.images}
          gamesList={data.gamesList}
          variant={getDeterminantOption(tagSlug, VARIANTS) as unknown as VARIANT_TYPE}
          sizes="(max-width: 500px) 275px, 550px"
          isLinks
        />
        <TagTitle {...data?.tag} minimal className={styles.title} />
        <GameList
          title={data?.tag?.pageTitle}
          gamesList={data.gamesList}
          className={styles.gamesList}
          isScoreDisplayed={false}
          isRankingDisplayed /> 
      </div>
    </PageContent>
  )
}

export default Tag;
