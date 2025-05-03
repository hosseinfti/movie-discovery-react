import { create } from "zustand";
import { Movie } from "../features/movies/types/movieTypes";

interface MovieCacheStore {
  cache: Record<string, Movie[]>;
  setCache: (query: string, page: number, movies: Movie[]) => void;
  getFromCache: (query: string, page: number) => Movie[] | undefined;
}

const makeCacheKey = (query: string, page: number) =>
  `${query.toLowerCase()}::page:${page}`;

export const useMovieCache = create<MovieCacheStore>((set, get) => ({
  cache: {},
  setCache: (query,page, movies) =>
    set((state) => ({
      cache: { ...state.cache, [makeCacheKey(query,page)]: movies },
    })),
  getFromCache: (query,page) => get().cache[makeCacheKey(query,page)],
}));
