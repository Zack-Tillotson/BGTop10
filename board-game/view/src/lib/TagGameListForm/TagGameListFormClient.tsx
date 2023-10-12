'use client'

import {Button, ButtonGroup} from '@mui/joy'
import { useTagRankedGameList, RankedGameList } from 'board-game-data/client';
import { GameList, TagForm, TagFull } from 'board-game-ui';
import { ChangeEventHandler } from 'react';

import styles from './TagGameListForm.module.scss'

interface TagGameListFormClientProps {
  slug: string,
  currentList: RankedGameList,
}

export default function TagGameListFormClient({slug, currentList}: TagGameListFormClientProps) {
  const {
    state,
    gameList: updatedList,
    handleGenerateList,
    handleSaveList,
  } = useTagRankedGameList(slug)
  
  return (
    <div className={styles.container}>
      <section>
        <div>State={state}</div>
        <ButtonGroup>
          <Button onClick={handleGenerateList}>Generate new list</Button>
          <Button onClick={handleSaveList} disabled={!updatedList.length}>Save list</Button>
        </ButtonGroup>
      </section>
      <section>
        <h3>Current list</h3>
        <GameList gamesList={currentList} />
      </section>
      <section>
        <h3>Updated list</h3>
        {updatedList && (<GameList gamesList={updatedList} />)}
      </section>
    </div>
  );
}
