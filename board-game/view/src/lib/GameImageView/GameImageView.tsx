import { Typography } from '@mui/joy';
import styles from './GameSearch.module.scss'
import {GameImageClient} from './GameImageClient'
import { takeGame } from 'board-game-data';

export async function GameImageView({bggId}: {bggId: number}) {
  const game = await takeGame(bggId)

  if(!game) throw new Error ('Game not found')

  return (
    <section>
      <GameImageClient
        bggId={bggId}
        imageThumbnail={game.imageThumbnail}
        image={game.image}
        imageSrcSet={game.imageSrcSet}
      />
    </section>
  )
}

export default GameImageView;
