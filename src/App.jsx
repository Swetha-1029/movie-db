import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import Genres from './pages/Genres'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <WatchlistProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </WatchlistProvider>
  )
}

export default App
