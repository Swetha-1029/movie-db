import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrending } from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './Home.module.css'

function Home() {
  const { movies, loading } = useTrending()
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const navigate = useNavigate()

  const hero = movies[0]
  const rest = movies.slice(1)
  const inList = hero ? isInWatchlist(hero.id) : false

  return (
    <div className={styles.page}>
      {hero && (
        <div
          className={styles.hero}
          style={{ backgroundImage: hero.poster ? `url(${hero.poster})` : 'none' }}
        >
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>🔥 Featured</span>
              <h1 className={styles.heroTitle}>{hero.title}</h1>
              <div className={styles.heroMeta}>
                {hero.rating && <span className={styles.heroRating}>★ {hero.rating}</span>}
                <span className={styles.heroYear}>{hero.year}</span>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.heroBtn} onClick={() => navigate(`/movie/${hero.id}`)}>
                  View Details
                </button>
                <button
                  className={`${styles.heroBtn} ${styles.heroBtnOutline} ${inList ? styles.saved : ''}`}
                  onClick={() => inList ? removeFromWatchlist(hero.id) : addToWatchlist(hero)}
                >
                  {inList ? '✓ Saved' : '+ Watchlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Movies</h2>
          <span className={styles.sectionCount}>{rest.length} movies</span>
        </div>
        <MovieGrid movies={rest} loading={loading} skeletonCount={19} />
      </div>
    </div>
  )
}

export default Home
