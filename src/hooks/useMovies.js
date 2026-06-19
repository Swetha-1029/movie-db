import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE = 'https://www.omdbapi.com/'

// OMDb has no "trending" endpoint, so we fetch a curated list of popular titles by IMDb ID
const FEATURED_IDS = [
  'tt15398776', // Oppenheimer
  'tt1517268',  // Barbie
  'tt6791350',  // Guardians of the Galaxy Vol. 3
  'tt9362722',  // Spider-Man: Across the Spider-Verse
  'tt15239678', // Dune: Part Two
  'tt1630029',  // Avatar: The Way of Water
  'tt9114286',  // Black Panther: Wakanda Forever
  'tt1745960',  // Top Gun: Maverick
  'tt10366206', // John Wick: Chapter 4
  'tt6710474',  // Everything Everywhere All at Once
  'tt1877830',  // The Batman
  'tt11286314', // Wonka
  'tt14230458', // The Holdovers
  'tt8589698',  // The Marvels
  'tt15314262', // Past Lives
  'tt10954984', // Killers of the Flower Moon
  'tt9603212',  // Saltburn
  'tt5108870',  // Napoleon
  'tt1745960',  // (placeholder unique fill)
  'tt0468569',  // The Dark Knight
]

function mapMovie(item) {
  return {
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : null,
    rating: item.imdbRating && item.imdbRating !== 'N/A' ? item.imdbRating : null,
    type: item.Type,
  }
}

export function useTrending() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const uniqueIds = [...new Set(FEATURED_IDS)]
        const results = await Promise.all(
          uniqueIds.map((id) =>
            fetch(`${BASE}?apikey=${API_KEY}&i=${id}`).then((r) => r.json())
          )
        )
        const valid = results
          .filter((r) => r.Response === 'True')
          .map(mapMovie)
        setMovies(valid)
      } catch (e) {
        setError('Failed to load movies. Check your internet connection.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return { movies, loading, error }
}

export function useSearch(query, page = 1) {
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); setTotalResults(0); return }
    setLoading(true)
    setError(null)

    async function fetchSearch() {
      try {
        const res = await fetch(`${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`)
        const data = await res.json()
        if (data.Response === 'True') {
          setResults(data.Search.map(mapMovie))
          setTotalResults(parseInt(data.totalResults, 10))
        } else {
          setResults([])
          setTotalResults(0)
          setError(data.Error || 'No results found.')
        }
      } catch (e) {
        setError('Search failed. Check your internet connection.')
      } finally {
        setLoading(false)
      }
    }
    fetchSearch()
  }, [query, page])

  const totalPages = Math.ceil(totalResults / 10)
  return { results, totalResults, totalPages, loading, error }
}

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setMovie(null)
    setError(null)

    async function fetchDetail() {
      try {
        const res = await fetch(`${BASE}?apikey=${API_KEY}&i=${id}&plot=full`)
        const data = await res.json()
        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error || 'Movie not found.')
        }
      } catch (e) {
        setError('Failed to load movie details.')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  return { movie, loading, error }
}

// OMDb has no genre-discovery endpoint, so genre browsing uses curated search terms per genre
const GENRE_SEARCH_TERMS = {
  Action: 'action',
  Comedy: 'comedy',
  Drama: 'drama',
  Horror: 'horror',
  Romance: 'love',
  'Sci-Fi': 'space',
  Thriller: 'thriller',
  Animation: 'animated',
  Adventure: 'adventure',
  Crime: 'crime',
}

export function useGenreMovies(genreName, page = 1) {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!genreName) return
    setLoading(true)
    const term = GENRE_SEARCH_TERMS[genreName] || genreName.toLowerCase()

    async function fetchGenre() {
      try {
        const res = await fetch(`${BASE}?apikey=${API_KEY}&s=${term}&type=movie&page=${page}`)
        const data = await res.json()
        if (data.Response === 'True') {
          setMovies(data.Search.map(mapMovie))
          setTotalPages(Math.min(Math.ceil(parseInt(data.totalResults, 10) / 10), 10))
        } else {
          setMovies([])
          setTotalPages(0)
        }
      } catch (e) {
        setError('Failed to load movies.')
      } finally {
        setLoading(false)
      }
    }
    fetchGenre()
  }, [genreName, page])

  return { movies, totalPages, loading, error }
}
