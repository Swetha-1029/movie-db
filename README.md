# Movie Database (React Router)

**Intern ID:** [YOUR INTERN ID]
**Full Name:** [YOUR FULL NAME]
**No. of Weeks:** [NUMBER OF WEEKS]
**Project Name:** Movie Database (React Router)

---

## Project Scope

A full-featured movie database web application built with React.js and React Router v6. The app uses the OMDb API to display featured movies, enable movie search with pagination, show detailed movie information including cast, director, and awards, and allow users to browse movies by genre. A persistent watchlist feature powered by localStorage lets users save and manage movies across sessions. The project demonstrates multi-page routing with React Router, API integration using fetch, Context API for global state, custom hooks, and component composition.

---

## Features

- **Home** — Featured movies with a hero banner
- **Movie Detail** — Full info: genre, rating, runtime, plot, cast, director, awards
- **Search** — Search any movie with pagination
- **Genres** — Browse movies by 10 genres (Action, Horror, Sci-Fi, etc.)
- **Watchlist** — Save/remove movies, persisted in localStorage
- Skeleton loading animations
- Fully responsive layout

## Tech Stack

- React 18
- Vite
- React Router v6
- Context API
- CSS Modules
- OMDb API (free)

## Getting Started

### 1. Get a free OMDb API key
- Go to [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
- Select the FREE tier and enter your email
- Check your inbox for the key, and click the activation link in the email

### 2. Set up environment variable
Create a `.env` file in the root folder:
```
VITE_OMDB_API_KEY=your_api_key_here
```

### 3. Run the app
```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Project Structure

```
src/
├── context/
│   └── WatchlistContext.jsx   ← global watchlist state (Context API)
├── hooks/
│   └── useMovies.js           ← all OMDb API calls (custom hooks)
├── components/
│   ├── Navbar.jsx             ← sticky nav with search + watchlist count
│   ├── MovieCard.jsx          ← movie poster card with watchlist toggle
│   └── MovieGrid.jsx          ← responsive grid with skeleton loaders
├── pages/
│   ├── Home.jsx               ← hero banner + featured movies grid
│   ├── Search.jsx             ← search results with pagination
│   ├── MovieDetail.jsx        ← full movie info + cast + awards
│   ├── Genres.jsx             ← browse by genre
│   └── Watchlist.jsx          ← saved movies list
├── App.jsx                    ← React Router routes
├── main.jsx                   ← Vite entry point
└── index.css                  ← global styles + CSS variables
```

## Pages & Routes

| Route | Page |
|-------|------|
| `/` | Home — featured movies |
| `/search?q=...` | Search results |
| `/movie/:id` | Movie detail |
| `/genres` | Browse by genre |
| `/watchlist` | My watchlist |

## Note on API choice

This project originally used the TMDB API, but TMDB is blocked by several ISPs in India. It was switched to the OMDb API, which is unaffected by this block and offers similarly rich movie data through a simple REST interface.
