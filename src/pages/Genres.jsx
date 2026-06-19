import React, { useState } from 'react'
import { useGenreMovies } from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import styles from './Genres.module.css'

const GENRES = [
  { name: 'Action', emoji: '💥' },
  { name: 'Comedy', emoji: '😂' },
  { name: 'Drama', emoji: '🎭' },
  { name: 'Horror', emoji: '👻' },
  { name: 'Romance', emoji: '❤️' },
  { name: 'Sci-Fi', emoji: '🚀' },
  { name: 'Thriller', emoji: '🔪' },
  { name: 'Animation', emoji: '🎨' },
  { name: 'Adventure', emoji: '🗺️' },
  { name: 'Crime', emoji: '🕵️' },
]

function GenreMovies({ genreName }) {
  const [page, setPage] = useState(1)
  const { movies, totalPages, loading } = useGenreMovies(genreName, page)

  return (
    <>
      <MovieGrid movies={movies} loading={loading} skeletonCount={10} />
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button className={styles.pageBtn} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>← Prev</button>
          <span className={styles.pageInfo}>Page {page}</span>
          <button className={styles.pageBtn} onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>Next →</button>
        </div>
      )}
    </>
  )
}

function Genres() {
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Browse by Genre</h1>

        <div className={styles.genreList}>
          {GENRES.map((g) => (
            <button
              key={g.name}
              className={`${styles.genreBtn} ${selectedGenre.name === g.name ? styles.active : ''}`}
              onClick={() => setSelectedGenre(g)}
            >
              <span>{g.emoji}</span>
              {g.name}
            </button>
          ))}
        </div>

        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{selectedGenre.emoji} {selectedGenre.name}</h2>
        </div>

        <GenreMovies key={selectedGenre.name} genreName={selectedGenre.name} />
      </div>
    </div>
  )
}

export default Genres
