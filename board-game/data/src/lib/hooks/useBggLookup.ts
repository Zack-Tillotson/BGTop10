import { useCallback, useEffect, useState } from "react";
import {bggNameSearch} from "../calc/bggNameSearch";

interface BggGame {
  name: string,
  yearPublished: string,
  bggId: number,
}

export function useBggLookup(onSelect: (bggId: number, context: any) => void) {
  const [isOpen, updateIsOpen] = useState(false)
  const [query, updateQuery] = useState('')
  const [context, updateContext] = useState({})
  const [games, updateGames] = useState<BggGame[]>([])

  useEffect(() => {
    bggNameSearch(query)
      .then(games => {
        updateGames(games || [])
      })
  }, [query])

  const handleLookupClick = useCallback((query: string, context: any) => {
    updateQuery(query)
    updateContext(context)
    updateIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    updateContext({})
    updateIsOpen(false)
  }, [])

  const handleBggSelection = useCallback((bggId: number) => {
    onSelect(bggId, context)
    handleClose()
  }, [onSelect, context, handleClose])

  return {
    isOpen,
    query,
    games,
    handleLookupClick,
    handleClose,
    handleBggSelection,
  }
}