import {TagTitle, GameList, GameImageList} from 'board-game-ui'
import {takeTag, getDeterminantOption} from 'board-game-data'
import {PageContent} from 'core-ui'

import styles from './Tag.module.scss'
import Link from 'next/link'

export interface TagProps {
  tagSlug: string,
  isShortList?: boolean,
}

type VARIANT_TYPE = 'A'|'B'|'C'|'D'
const VARIANTS = ['A', 'B', 'C', 'D']

export async function Tag({tagSlug, isShortList = true}: TagProps) {
  const data = await takeTag(tagSlug, true, isShortList)
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
        <div className={styles.gameListLinkContainer}>
          {isShortList && (
            <p>Want to see more games? This is the top 10 games, click below to see the extended list of the best 25 games.</p>
          )}
          <Link
            className={styles.gameListLink}
            href={`/${data?.tag?.slug}/${isShortList ? 'full' : ''}#game-list`}>
            View {isShortList ? 'full' : 'short'} list
          </Link>
        </div>
      </div>
    </PageContent>
  )
}

export default Tag;
