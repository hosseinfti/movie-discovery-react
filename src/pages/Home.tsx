import {
  Suspense,
  lazy,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Box,
  Container,
  FormControlLabel,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { fetchMovies } from "../features/movies/api/tmdApi";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

import LoadingSpinner from "../shared/components/LoadingSpinner";
import { Movie } from "../features/movies/types/movieTypes";
import { useMovieCache } from "../store/useMovieCache";

const MovieSearchInput = lazy(
  () => import("../features/movies/components/MovieSearchInput")
);
const MovieGrid = lazy(() => import("../features/movies/components/MovieGrid"));
const MoviePagination = lazy(
  () => import("../shared/components/MoviePagination")
);

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const query = searchParams.get("query") || "";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const loadMovies = useCallback(async () => {
    const cached = useMovieCache.getState().getFromCache(query);
    if (cached) {
      setMovies(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchMovies(page, query);
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      useMovieCache.getState().setCache(query, data.results); // ذخیره در کش
    } catch (err) {
      console.error("Error loading movies", err);
    }
    setLoading(false);
  }, [page, query]);

  useEffect(() => {
    loadMovies();
  }, [page]);

  useEffect(() => {
    if (isMobile) {
      setViewMode("list");
    } else {
      setViewMode("grid");
    }
  }, [isMobile]);

  const debouncedLoad = useMemo(() => debounce(loadMovies, 500), [loadMovies]);

  useEffect(() => {
    debouncedLoad();
    return () => {
      debouncedLoad.cancel();
    };
  }, [query, debouncedLoad]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value;
    setSearchParams({ query: queryValue });
  };

  return (
    <Container
      sx={{
        height: "100vh",
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Discover Movies
      </Typography>

      <MovieSearchInput query={query} onChange={handleSearch} />

      {isMobile && (
        <FormControlLabel
          sx={{ width: "100%", p: 0, m: 0 }}
          control={
            <Switch
              checked={viewMode === "grid"}
              onChange={() =>
                setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
              }
              name="toggleView"
              color="primary"
            />
          }
          label={viewMode === "grid" ? "Card View" : "List View"}
        />
      )}
      {loading ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <MovieGrid viewMode={viewMode} movies={movies} />
          <Suspense fallback={<LoadingSpinner />}>
            {!loading && totalPages > 1 && (
              <MoviePagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            )}
          </Suspense>
        </>
      )}
    </Container>
  );
};

export default Home;
