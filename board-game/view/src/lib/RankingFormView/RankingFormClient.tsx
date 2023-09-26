'use client'

import {Button} from '@mui/joy'
import { useRankingForm, Ranking } from 'board-game-data/client';
import { RankingForm, RankingFull } from 'board-game-ui';
import { ChangeEventHandler } from 'react';

interface RankingFormClientProps {
  ranking?: Ranking
}

export default function RankingFormClient({ranking}: RankingFormClientProps) {
  const {
    isLoading,
    isPreview,
    formValues,
    formRanking,
    handleChange, 
    handleSubmit,
    handleCancel,
    handleConfirm,
  } = useRankingForm(ranking)
  
  return (
    <div>
      {isLoading && '...'}
      {isPreview && (
        <div>
          <RankingFull {...formRanking} />
          <div>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
          </div>
        </div>
      )}
      {!isLoading && !isPreview && (
        <RankingForm 
          formValues={formValues} 
          onSubmit={handleSubmit} 
          onChange={handleChange as unknown as (key: string) => ChangeEventHandler<HTMLInputElement>} 
        />
      )}
    </div>
  );
}
