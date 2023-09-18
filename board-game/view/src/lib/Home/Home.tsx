import {PageContent, TagSummary, TagBrief} from 'board-game-ui'
import {useTagsSummary} from 'board-game-data'
import { Typography } from '@mui/joy';
import Link from 'next/link';

export async function Home() {
  const tags = await useTagsSummary()
  return (
    <PageContent
      title={'These are the best board games'}
      subtitle={'We\'ve scoured the internet to find the best board games, sorted by year and other collections.'}
    >
      <section>
      {tags.slice(0, 3).map(({tag, gamesList}) => (
        <TagSummary tag={tag} gamesList={gamesList} key={tag.id} />
      ))}
      </section>
      <section>
      <Typography level="h3">More categories</Typography>
        {tags.slice(3).map(({tag, gamesList}) => (
          <Link href={`/${tag.slug}`} key={tag.id}>
            <section>
              <TagBrief tag={tag} gamesList={gamesList} />
            </section>
            </Link>
        ))}
      </section>
    </PageContent>
  )
}

export default Home;
