# Movie Explorer App

This app allows users to search for movies, view them in grid/list layout, and paginate through results. Built with React, TypeScript, MUI, and TMDB API.

## Features

- Search with debounce and query sync in URL
- Mobile-friendly list/grid toggle
- Lazy-loaded components

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/hosseinfti/movie-discovery-react.git
cd movie-discovery-react

# 2. Install dependencies
npm install

# 3. Add your TMDB API key
# Create a .env file and add:
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL='https://api.themoviedb.org/3'
# 4. Start the app
npm run dev
```
