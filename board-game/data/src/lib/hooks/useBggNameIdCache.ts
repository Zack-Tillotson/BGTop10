import { useEffect, useMemo, useState } from "react";

export type BggNameIdCache = {
  [key: string]: number,
}

export default function useBggNameIdCache(cacheName = 'bggNameIdCache') {
  const [cache, updateCache] = useState({} as BggNameIdCache)

  useEffect(() => {
    try {
      const stringValue = localStorage.getItem(cacheName)
      const cache = JSON.parse(stringValue || '{}')
      updateCache(cache)
    } catch(e) {
      console.log("WARN", 'Unable to load BGG Name to ID cache', e)
    }
  }, [cacheName])

  const getValue = (cacheKey: string) => cache[cacheKey.toLowerCase()]
  const setValue = (cacheKey: string, cacheValue: number) => {
    const newCacheValue = {...cache, [cacheKey.toLowerCase()]: cacheValue}
    updateCache(newCacheValue)
    localStorage.setItem(cacheName, JSON.stringify(newCacheValue))
  }

  const library = useMemo(() => ({getValue, setValue}), [cache])

  return library
}