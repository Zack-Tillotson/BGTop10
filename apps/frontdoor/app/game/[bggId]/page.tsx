import styles from './page.module.scss'
import {takeTags} from 'board-game-data'
import { Game } from 'board-game-view'

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
  return (
    <Game bggId={bggId} />
  )
}
