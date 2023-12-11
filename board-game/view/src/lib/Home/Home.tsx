import { Typography } from '@mui/joy';
import Link from 'next/link';

import {PageContent} from 'core-ui'
import {TagHighlight, TagBrief} from 'board-game-ui'
import {takeTags} from 'board-game-data'

const TAGS_TO_HIGHLIGHT_COUNT = 99

export async function Home() {
  const tags = await takeTags(true, {orderBy: ['priority', 'desc']})
  return (
    <PageContent
      title={'These are the best board games'}
      subtitle={'We\'ve scoured the internet to find the best board games, sorted by year and other collections.'}
    >
      {tags.slice(0, TAGS_TO_HIGHLIGHT_COUNT).map(({tag, gamesList}, index) => (
        <TagHighlight
          key={tag.id}
          tag={tag}
          gamesList={gamesList}
          direction={index % 2 === 0 ? 'L2R' : 'R2L'}
        />
      ))}
    </PageContent>
  )
}

export default Home;
