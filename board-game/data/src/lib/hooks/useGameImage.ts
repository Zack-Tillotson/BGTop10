'use client'

import { useCallback, useState } from "react";
import { submitForm } from "../fetch/submitForm";
import { Game } from "../../dataTypes";

export function useGameImage(bggId: Game["bggId"]) {
  const [isCombinedView, updateIsCombinedView] = useState(true)
  const [isLoading, updateIsLoading] = useState(false)
  const [isError, updateIsError] = useState(false)
  
  const handleToggleClick = useCallback(() => {
    updateIsCombinedView(!isCombinedView)
  }, [isCombinedView])

  const handleRefreshClick = () => {
    updateIsLoading(true)
    updateIsError(false)

    submitForm('game-image', {id: String(bggId)})
      .then(() => {
        window.location.reload()
        updateIsLoading(false)
      })
      .catch(() => {
        updateIsLoading(false)
        updateIsError(true)
      })

  }

  return {
    isCombinedView,
    isLoading,
    isError,

    handleToggleClick,
    handleRefreshClick,
  }
}