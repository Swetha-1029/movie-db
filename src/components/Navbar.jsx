import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './Navbar.module.css'

function Navbar() {
  const { watchlist } = useWatchlist()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          Movie<span>DB</span>
        </NavLink>

        <div className={styles.links}>
          <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link} end>
            Home
          </NavLink>
          <NavLink to="/genres" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            Genres
          </NavLink>
          <NavLink to="/watchlist" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            Watchlist
            {watchlist.length > 0 && <span className={styles.badge}>{watchlist.length}</span>}
          </NavLink>
        </div>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.searchBtn} type="submit" aria-label="Search">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
