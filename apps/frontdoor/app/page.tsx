import styles from './page.module.scss';
import {GameList} from 'board-game-view'

export default async function Index() {
  
  const apiString = `${Date.now()}`

  return (
    <div>
      <div>
        String: {apiString}
      </div>
      <GameList />
    </div>
  );
}
