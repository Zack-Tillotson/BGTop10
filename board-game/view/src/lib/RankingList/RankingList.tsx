import { Typography } from '@mui/joy';
import Link from 'next/link';

import { Ranking, takeRankings, takeTag} from 'board-game-data'

import { RankingBrief } from 'board-game-ui'
import { PageContent } from 'core-ui';

import styles from './RankingList.module.scss'
import { QueryOptions } from 'board-game/data/src/lib/firebase/firestore';

interface RankingListProps {
  tagSlug?: string
}

function RankingContent({ranking, withLinks}: {ranking: Ranking, withLinks: boolean}) {

  if(withLinks) {
    return (
      <Link href={`/ranking/${ranking.slug}`}>
        <RankingBrief {...ranking} className={styles.item} />
      </Link>
    )
  }
  return (
    <RankingBrief {...ranking} className={styles.item} isExternalLink />
  )
}

export async function RankingList({tagSlug}: RankingListProps) {
  const {tag} = await takeTag(tagSlug, false)

  const options: QueryOptions = {orderBy: ['datePublished', 'desc'], maxCount: -1}
  if(tag?.id) {
    options.query = ['tag', '==', tag.id]
  }
  const list = await takeRankings(options)

  const title = `Rankings for ${tag?.pageTitle || 'everything'}`
  const description = `This is the list of Top 10 rankings used to determine the overall ${tag?.pageTitle || 'Best games'}`

  return (
    <PageContent
      title={title}
      subtitle={description}
    >
      <ul className={styles.container}>
        {list.map((ranking) => (
          <li key={ranking.id} className={styles.li}>
            <RankingContent ranking={ranking} withLinks={!tagSlug} />
          </li>
        ))}
      </ul>
    </PageContent>
  )
}

export default RankingList;
