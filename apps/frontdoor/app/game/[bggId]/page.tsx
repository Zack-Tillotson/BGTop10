import Link from 'next/link';
import {PageContent} from 'core-ui'

import styles from './page.module.scss';
import { takeGame, takeTags } from 'board-game-data';
import { GameFull } from 'board-game-ui';

interface GameProps {
  params: {
    bggId: string,
  }
}

export async function generateStaticParams() {
  const tagsWithMeta = await takeTags(true)
 
  const bggIdObject = tagsWithMeta
    .map(({gamesList}) => gamesList)
    .map(list => list.map(({game}) => game.bggId))
    .reduce((soFar, list) => {
      list.forEach(bggId => soFar[bggId] = true)
      return soFar
    }, {} as unknown as any)
    
  return Object.keys(bggIdObject).map(bggId => ({bggId}))
}

export default async function Index({params: {bggId}}: GameProps) {
  const game = await takeGame(Number(bggId))

  if(!game) throw new Error('Game not found')
  
  return (
    <PageContent title={game.name} subtitle={`(${game?.yearPublished})`}>
      <GameFull {...game} isBrief={false} />
    </PageContent>
  );
}
