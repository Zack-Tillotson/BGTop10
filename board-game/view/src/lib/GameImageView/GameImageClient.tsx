'use client'

import { Game, useGameImage } from 'board-game-data/client' 
import { GameImage } from 'board-game-ui';

import styles from './GameImage.module.scss'
import { useCallback, useState } from 'react';

interface GameImageClientProps {
  bggId: Game["bggId"],
  imageThumbnail: Game["imageThumbnail"],
  image: Game["image"],
  imageSrcSet: Game["imageSrcSet"],
}

export function GameImageClient({bggId, imageThumbnail, image, imageSrcSet}: GameImageClientProps) {

  const {
    isCombinedView,
    isLoading,
    isError,

    handleToggleClick,
    handleRefreshClick,
  } = useGameImage(bggId)

  return (
    <div>
      <section>
        <label htmlFor="toggle-checkbox">Show combined view?
          <input id="toggle-checkbox" type="checkbox" checked={isCombinedView} onChange={handleToggleClick} />
        </label>
        <label htmlFor="rebuild-button">Refresh images
          <button id="rebuild-button" onClick={handleRefreshClick}>Refresh images</button>
        </label>
        <div>
          {isLoading && 'loading...'}
          {isError && 'error'}
        </div>
      </section>
      {isCombinedView && (
        <section className={styles.highlight}>
          <h2>Image SrcSet: Combined</h2>
          {!!imageSrcSet && (  
            <div className={styles.imgWrapper}>
              <GameImage src={image} srcSet={imageSrcSet} />
            </div>
          )}
          {!imageSrcSet && (
            `No 'imageSrcSet' attribute`
          )}
        </section>
      )}
      {!isCombinedView && (
        <div>
          <section className={styles.highlight}>
            <h2>Thumbnail</h2>
            <div className={styles.imgWrapper}>
              <GameImage src={imageThumbnail} />
            </div>
          </section>
          {!!imageSrcSet && Object.keys(imageSrcSet).map(size => (
            <section key={size}>
              <h2>Image SrcSet: {size}</h2>
              <div className={styles.imgWrapper}>
                <GameImage src={imageSrcSet[Number(size)]} />
              </div>
            </section>
          ))}
          <section>
            <h2>Original</h2>
            <div className={styles.imgWrapper}>
              <GameImage src={image} />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
