import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './Watchlist.module.css'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Watchlist</h1>
          <span className={styles.count}>{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}</span>
        </div>

        {watchlist.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🎬</span>
            <p>Your watchlist is empty</p>
            <button className={styles.browseBtn} onClick={() => navigate('/')}>
              Browse Movies
            </button>
          </div>
        ) : (
          <div className={styles.list}>
            {watchlist.map((movie) => (
              <div key={movie.id} className={styles.item}>
                <div className={styles.poster} onClick={() => navigate(`/movie/${movie.id}`)}>
                  {movie.poster
                    ? <img src={movie.poster} alt={movie.title} />
                    : <span>🎬</span>
                  }
                </div>
                <div className={styles.info} onClick={() => navigate(`/movie/${movie.id}`)}>
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                  <div className={styles.meta}>
                    {movie.rating && <span className={styles.rating}>★ {movie.rating}</span>}
                    <span className={styles.year}>{movie.year}</span>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromWatchlist(movie.id)}
                  title="Remove from watchlist"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Watchlist
