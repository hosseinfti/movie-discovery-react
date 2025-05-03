import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string

export const fetchMovies = async (page = 1, query = '') => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);

  const from = lastMonth.toISOString().split('T')[0];
  const to = now.toISOString().split('T')[0];
  const param = query ? "search" : "discover"
  const response = await axios.get(`${BASE_URL}/${param}/movie`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page,
      'primary_release_date.gte': from,
      'primary_release_date.lte': to,
      ...(query ? { query } : {}),
    },
  });

  return response.data;
};
