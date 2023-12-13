import {TagTitle, GameList, GameBriefList, GameImageList} from 'board-game-ui'
import {takeTag} from 'board-game-data'
import {PageContent} from 'core-ui'

import styles from './Tag.module.scss'

export interface TagProps {
  tagSlug: string,
}

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
          linkRoot={`/${data?.tag?.slug}`}
          primaryDirection="horizontal" />
        <TagTitle {...data?.tag} className={styles.title} />
        <GameBriefList gamesList={data.gamesList} className={styles.quickLinks} />
        <GameList gamesList={data.gamesList} className={styles.gamesList} isScoreDisplayed={false} /> 
      </div>
    </PageContent>
  )
}

export default Tag;
