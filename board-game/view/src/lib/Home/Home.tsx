import Typography from '@mui/joy/Typography';
import Link from 'next/link';

import {PageContent} from 'core-ui/PageContent'
import {TagList} from '../TagList'

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
