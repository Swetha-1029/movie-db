import React from 'react'
import MovieCard from './MovieCard'
import styles from './MovieGrid.module.css'

function MovieGrid({ movies, loading, skeletonCount = 12 }) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonPoster} />
            <div className={styles.skeletonInfo}>
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineShort} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className={styles.empty}>
        <span>🎬</span>
        <p>No movies found.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid
