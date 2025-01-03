'use client'

import Button from '@mui/joy/Button'
import { Ranking, Tag, Game, Creator } from 'board-game-datatypes';
import { useBggLookup } from 'board-game-data/hooks/useBggLookup';
import { useRankingForm } from 'board-game-data/hooks/useRankingForm';
import { RankingForm } from 'board-game-ui/RankingForm';
import { RankingFull } from 'board-game-ui/RankingFull';
import { ChangeEventHandler } from 'react';
import {BggLookup} from '../BggLookup';

interface RankingFormClientProps {
  ranking?: Ranking
  tags: {
    tag: Tag;
    gamesList: Game[];
  }[],
  creators: Creator[],
}

export default function RankingFormClient({ranking, tags, creators}: RankingFormClientProps) {
  const {
    isLoading,
    isPreview,
    isFormValid,
    formValues,
    formRanking,
    handleChange,
    handlePersonChange,
    handleBggSelection,
    handlePreloadBggIds,
    handleSubmit,
    handleCancel,
    handleConfirm,
  } = useRankingForm(creators, ranking)

  const bggLookup = useBggLookup(handleBggSelection)

  return (
    <div>
      {isLoading && '...'}
      {isPreview && (
        <div>
          <RankingFull 
            ranking={formRanking} 
            tag={tags.find(({tag}) => tag.id === formRanking.tag)} 
            creator={creators.find(creator => creator.id === formRanking.creator)} 
          />
          <section>
            <h4>Games</h4>
            {ranking?.gameLink.map(({person, games}, index) => (
              <div key={index}>
                <div><b>Person: {person}</b></div>
                <div>Games: {games.join(', ')}</div>
              </div>
            ))}
          </section>
          <div>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirm}>Submit</Button>
          </div>
        </div>
      )}
      {!isLoading && !isPreview && (
        <RankingForm 
          tags={tags}
          creators={creators}
          formValues={formValues} 
          isFormValid={isFormValid}
          onSubmit={handleSubmit} 
          onChange={handleChange as unknown as (key: string) => ChangeEventHandler<HTMLInputElement>} 
          onPersonChange={handlePersonChange as unknown as (key: string) => ChangeEventHandler<HTMLInputElement>} 
          onBggLookupClick={bggLookup.handleLookupClick}
          onBggPreloadIds={handlePreloadBggIds}
        />
      )}
      {bggLookup.isOpen && (
        <BggLookup 
          query={bggLookup.query} 
          games={bggLookup.games}
          onSelect={bggLookup.handleBggSelection} 
          onClose={bggLookup.handleClose}
        />
      )}
    </div>
  );
}
