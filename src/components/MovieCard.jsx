import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './MovieCard.module.css'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const inList = isInWatchlist(movie.id)
  const [imgError, setImgError] = useState(false)

  const handleWatchlist = (e) => {
    e.stopPropagation()
    inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
  }

  const showPoster = movie.poster && !imgError

  return (
    <div className={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className={styles.posterWrap}>
        {showPoster ? (
          <img
            className={styles.poster}
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.noPoster}>🎬</div>
        )}
        <div className={styles.overlay}>
          <button
            className={`${styles.watchBtn} ${inList ? styles.inList : ''}`}
            onClick={handleWatchlist}
            title={inList ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {inList ? '✓ Saved' : '+ Watchlist'}
          </button>
        </div>
        {movie.rating && (
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            {movie.rating}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{movie.title}</p>
        <p className={styles.year}>{movie.year}</p>
      </div>
    </div>
  )
}

export default MovieCard
