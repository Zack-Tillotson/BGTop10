'use client'

import {Input, Link} from '@mui/joy'
import { useGameSearch} from 'board-game-data/client' 
import { GameBrief } from 'board-game-ui';

export function GameSearchClient() {
  
  const {
    queryTerm, 
    gamesList,

    handleChange,
  } = useGameSearch()

  return (
    <div>
      <Input type="text" value={queryTerm} onChange={handleChange} />
      <ol>
        {gamesList.map(game => (
          <li key={game.bggId}>
            <Link href={`/game/${game.bggId}`}>
              <GameBrief {...game} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default GameSearchClient;
