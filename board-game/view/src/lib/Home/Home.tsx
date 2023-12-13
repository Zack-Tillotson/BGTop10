import { Typography } from '@mui/joy';
import Link from 'next/link';

import {PageContent} from 'core-ui'
import {TagList} from 'board-game-view'

export async function Home() {
  return (
    <PageContent
      title={'These are the best board games'}
      subtitle={'We\'ve scoured the internet to find the best board games, sorted by year and other collections.'}
    >
      <TagList />
    </PageContent>
  )
}

export default Home;
