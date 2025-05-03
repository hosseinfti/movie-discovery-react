// src/features/MovieListPage.tsx
import { useEffect, useState } from "react";
import { Grid, Pagination, TextField, Container } from "@mui/material";
import MovieCard from "./components/MovieCard";
import { fetchMovies } from "./api/tmdApi";
import { Movie } from "./types/movieTypes";

export const MovieListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const load = async () => {
    const data = await fetchMovies(page, query);
    setMovies(data.results);
    setTotalPages(data.total_pages > 50 ? 50 : data.total_pages);
  };

  useEffect(() => {
    load();
  }, [page, query]);

  return (
    <Container>
      <TextField
        label="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};
