'use client'

import { useCallback } from "react"

import styles from './ScrollToTop.module.scss'

export function ScrollToTop() {
  const handleBackToTopClick = useCallback(() =>  {
    window.scrollTo(0, 0)
  }, [])
  return (
    <button onClick={handleBackToTopClick} className={styles.container}>
      Back to top
    </button>
  )
}