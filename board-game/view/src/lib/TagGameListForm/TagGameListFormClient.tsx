'use client'

import {Button, ButtonGroup, Chip, ChipPropsColorOverrides} from '@mui/joy'
import { useTagRankedGameList, RankedGameList, HOOK_STATE } from 'board-game-data/client';
import { GameList } from 'board-game-ui';

import styles from './TagGameListForm.module.scss'

interface TagGameListFormClientProps {
  slug: string,
  currentList: RankedGameList,
}

const neutralStatus = [HOOK_STATE.CLEAN]
const primaryStatus = [HOOK_STATE.GENERATING_IN_PROGRESS, HOOK_STATE.SAVING_IN_PROGRESS, HOOK_STATE.IN_REVIEW]
const dangerStatus = [HOOK_STATE.SAVING_ERROR, HOOK_STATE.GENERATING_ERROR]
const successStatus = [HOOK_STATE.SAVING_SUCCESS]

export default function TagGameListFormClient({slug, currentList}: TagGameListFormClientProps) {
  const {
    state,
    gameList: updatedList,
    handleGenerateList,
    handleSaveList,
    handleUpdateAllGames,
  } = useTagRankedGameList(slug)

  let statusColor = 'neutral'
  switch(true) {
    case neutralStatus.includes(state): {
      statusColor = 'neutral'
      break
    }
    case primaryStatus.includes(state): {
      statusColor = 'primary'
      break
    }
    case dangerStatus.includes(state): {
      statusColor = 'danger'
      break
    }
    case successStatus.includes(state): {
      statusColor = 'success'
      break
    }
  }
  
  return (
    <div className={styles.container}>
      <section>
        <ButtonGroup>
          <Button onClick={handleGenerateList}>Generate new list</Button>
          <Button onClick={handleSaveList} disabled={!updatedList.length}>Save list</Button>
          <Button onClick={handleUpdateAllGames} disabled={!updatedList.length}>Update games</Button>
          <Chip color={statusColor as unknown as undefined} variant="solid" size="lg">{state}</Chip>
        </ButtonGroup>
      </section>
      {updatedList.length > 0 && (
        <section className={styles.listContainer}>
          <h3>Updated list</h3>
          {updatedList && (<GameList gamesList={updatedList} isScoreDisplayed />)}
        </section>
      )}
      <section className={styles.listContainer}>
        <h3>{updatedList.length > 0 ? 'Prior' : 'Current'} list</h3>
        <GameList gamesList={currentList} isScoreDisplayed />
      </section>
    </div>
  );
}
