'use client'
import Button from '@mui/joy/Button'
import { Game } from 'board-game-datatypes';
import { useGameForm } from 'board-game-data/hooks/useGameForm';
import { GameForm } from 'board-game-ui/GameForm';
import { GameFull } from 'board-game-ui/GameFull';
import { ChangeEventHandler } from 'react';

interface GameFormClientProps {
  bggId: number,
  game?: Game
}

export default function GameFormClient({bggId, game}: GameFormClientProps) {
  const {
    isLoading,
    isPreview,
    formValues,
    formGame,
    handleChange, 
    handleSubmit,
    handleCancel,
    handleConfirm,
    handleUpdateFromBgg,
  } = useGameForm(bggId, game)
  
  return (
    <div>
      {isLoading && '...'}
      {isPreview && (
        <div>
          <GameFull {...formGame} />
          <div>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
          </div>
        </div>
      )}
      {!isLoading && !isPreview && (
        <GameForm 
          formValues={formValues} 
          onSubmit={handleSubmit} 
          onChange={handleChange as unknown as (key: string) => ChangeEventHandler<HTMLInputElement>} 
          onUpdateFromBgg={handleUpdateFromBgg}
        />
      )}
    </div>
  );
}
