# Movie Database (React Router)

- **Intern ID:** CITS3094
- **Full Name:** Swetha C
- **No. of Weeks:** 4 weeks
- **Project Name:** Movie Database (React Router)
- **Domain Name:** React.js web development

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
