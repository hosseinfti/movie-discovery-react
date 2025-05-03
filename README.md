# 🎬 Movie Discovery App

This is a simple React + TypeScript frontend application that consumes the TMDB API to display movies released in the past month. The project is part of a technical assessment for a Front-End Engineer position at Coordina Technologies.

---

## 🚀 Tech Stack

- ⚛️ React 18 (via Vite)
- 🧑‍🎨 MUI (Material UI)
- 🔤 TypeScript
- 🔗 Axios
- 📦 Zustand (if you use it for state)
- 🔍 TMDB API

---

## 📌 Features

- Fetch movies released in the last month using `/discover` endpoint
- Show:
  - 🎞 Poster
  - 📝 Title
  - 📃 Overview
- Search movies by title
- Pagination (controlled)
- Local caching (optional with SWR or Zustand)
- Fully responsive UI using Material UI

---

## 🔧 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/movie-discovery-react.git
cd movie-discovery-react

# 2. Install dependencies
npm install

# 3. Add your TMDB API key
# Create a .env file and add:
VITE_TMDB_API_KEY=your_api_key_here

# 4. Start the app
npm run dev
```
