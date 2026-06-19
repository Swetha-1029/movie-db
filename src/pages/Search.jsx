import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import styles from './Search.module.css'

function Search() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [page, setPage] = useState(1)
  const { results, totalResults, totalPages, loading, error } = useSearch(q, page)

  useEffect(() => { setPage(1) }, [q])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {q ? <>Results for <span>"{q}"</span></> : 'Search Movies'}
          </h1>
          {!loading && totalResults > 0 && (
            <p className={styles.sub}>{totalResults} movies found</p>
          )}
        </div>

        {error && !loading && results.length === 0 ? (
          <div className={styles.errorMsg}>⚠️ {error}</div>
        ) : (
          <MovieGrid movies={results} loading={loading} skeletonCount={10} />
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Prev
            </button>
            <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
