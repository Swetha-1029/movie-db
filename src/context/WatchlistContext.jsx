import React, { createContext, useContext, useState, useEffect } from 'react'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('moviedb-watchlist')
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('moviedb-watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    )
  }

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id))
  }

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id)

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}
