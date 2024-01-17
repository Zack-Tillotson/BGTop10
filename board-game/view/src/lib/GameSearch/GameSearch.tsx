import Typography from '@mui/joy/Typography';
import styles from './GameSearch.module.scss'
import {GameSearchClient} from './GameSearchClient'

export async function GameSearch() {
  
  return (
    <section>
      <Typography level="h2">Search games</Typography>
      <GameSearchClient />
    </section>
  )
}

export default GameSearch;
