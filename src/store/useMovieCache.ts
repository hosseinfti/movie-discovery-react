import { create } from "zustand";
import { Movie } from "../features/movies/types/movieTypes";

interface MovieCacheStore {
  cache: Record<string, Movie[]>;
  setCache: (query: string, movies: Movie[]) => void;
  getFromCache: (query: string) => Movie[] | undefined;
}

export const useMovieCache = create<MovieCacheStore>((set, get) => ({
  cache: {},
  setCache: (query, movies) =>
    set((state) => ({
      cache: { ...state.cache, [query]: movies },
    })),
  getFromCache: (query) => get().cache[query],
}));
