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

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
  }, [page, query]);

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
        onChange={(e) => {
          setPage(1);
          setQuery(e.target.value);
        }}
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
