'use client'

import Input from '@mui/joy/Input'
import Link from '@mui/joy/Link'
import { useGameSearch} from 'board-game-data/hooks/useGameSearch' 
import { GameBrief } from 'board-game-ui/GameBrief';

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
