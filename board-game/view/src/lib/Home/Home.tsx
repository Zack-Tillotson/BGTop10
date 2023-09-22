import { Typography } from '@mui/joy';
import Link from 'next/link';

import {PageContent} from 'core-ui'
import {TagSummary, TagBrief} from 'board-game-ui'
import {takeTags} from 'board-game-data'

export async function Home() {
  const tags = await takeTags()
  return (
    <PageContent
      title={'These are the best board games'}
      subtitle={'We\'ve scoured the internet to find the best board games, sorted by year and other collections.'}
    >
      <section>
      {tags.slice(0, 4).map(({tag, gamesList}) => (
        <TagSummary tag={tag} gamesList={gamesList} key={tag.id} />
      ))}
      </section>
      <section>
      <Typography level="h3">More categories</Typography>
        {tags.slice(4).map(({tag, gamesList}) => (
          <Link href={`/${tag.slug}`} key={tag.id}>
            <section>
              <TagBrief {...tag} />
            </section>
            </Link>
        ))}
      </section>
    </PageContent>
  )
}

export default Home;
