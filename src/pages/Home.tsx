import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import { fetchMovies } from "../features/movies/api/tmdApi";
import MovieCard from "../features/movies/components/MovieCard";
import debounce from "lodash.debounce";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("query") || "";

  //TODO : use the smaller components
  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(page, query);
      setMovies(data.results);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // API max limit
    } catch (err) {
      console.error("Error loading movies", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, [page]);

  useEffect(() => {
    const debouncedLoad = debounce(loadMovies, 500);
    debouncedLoad();
    return () => debouncedLoad.cancel();
  }, [query]);

  const handleSearchMovies = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchParams({ query: e.target.value });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Discover Movies
      </Typography>

      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        defaultValue={query}
        onChange={handleSearchMovies}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
