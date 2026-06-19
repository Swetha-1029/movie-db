import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovies'
import { useWatchlist } from '../context/WatchlistContext'
import styles from './MovieDetail.module.css'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movie, loading, error } = useMovieDetail(id)
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()

  if (loading) return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner} />
    </div>
  )

  if (error || !movie) return (
    <div className={styles.errorPage}>
      <p>⚠️ {error || 'Movie not found.'}</p>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>← Go Back</button>
    </div>
  )

  const watchlistMovie = {
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== 'N/A' ? movie.Poster : null,
    rating: movie.imdbRating !== 'N/A' ? movie.imdbRating : null,
  }
  const inList = isInWatchlist(movie.imdbID)
  const poster = movie.Poster !== 'N/A' ? movie.Poster : null
  const genres = movie.Genre !== 'N/A' ? movie.Genre.split(', ') : []
  const actors = movie.Actors !== 'N/A' ? movie.Actors.split(', ') : []

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div className={styles.top}>
          <div className={styles.posterWrap}>
            {poster
              ? <img className={styles.poster} src={poster} alt={movie.Title} />
              : <div className={styles.noPoster}>🎬</div>
            }
          </div>

          <div className={styles.info}>
            <div className={styles.genres}>
              {genres.map((g) => (
                <span key={g} className={styles.genre}>{g}</span>
              ))}
            </div>

            <h1 className={styles.title}>{movie.Title}</h1>

            <div className={styles.meta}>
              {movie.imdbRating !== 'N/A' && (
                <span className={styles.rating}>★ {movie.imdbRating}</span>
              )}
              <span className={styles.metaItem}>{movie.Year}</span>
              <span className={styles.metaItem}>{movie.Runtime}</span>
              <span className={styles.metaItem}>{movie.Rated}</span>
            </div>

            <p className={styles.overview}>{movie.Plot !== 'N/A' ? movie.Plot : 'No description available.'}</p>

            <button
              className={`${styles.watchlistBtn} ${inList ? styles.inList : ''}`}
              onClick={() => inList ? removeFromWatchlist(movie.imdbID) : addToWatchlist(watchlistMovie)}
            >
              {inList ? '✓ Saved to Watchlist' : '+ Add to Watchlist'}
            </button>

            <div className={styles.extraMeta}>
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Director</span>
                <span className={styles.extraVal}>{movie.Director !== 'N/A' ? movie.Director : '—'}</span>
              </div>
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className={styles.extraItem}>
                  <span className={styles.extraLabel}>Box Office</span>
                  <span className={styles.extraVal}>{movie.BoxOffice}</span>
                </div>
              )}
              <div className={styles.extraItem}>
                <span className={styles.extraLabel}>Language</span>
                <span className={styles.extraVal}>{movie.Language !== 'N/A' ? movie.Language : '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {actors.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cast</h2>
            <div className={styles.castList}>
              {actors.map((actor) => (
                <div key={actor} className={styles.castItem}>
                  <div className={styles.castImg}>👤</div>
                  <p className={styles.castName}>{actor}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {movie.Awards && movie.Awards !== 'N/A' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🏆 Awards</h2>
            <p className={styles.awards}>{movie.Awards}</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default MovieDetail
