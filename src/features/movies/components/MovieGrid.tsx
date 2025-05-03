import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import MovieCard from "./MovieCard";

interface IComponentProps {
  movies: any[];
  viewMode: "grid" | "list";
}
const MovieGrid = ({ viewMode, movies }: IComponentProps) => {
  return (
    <Grid container spacing={3}>
      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <List sx={{ width: "100%" }}>
          {movies.map((movie) => (
            <ListItem key={movie.id} alignItems="flex-start" sx={{ p: 0 }}>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ width: 60, height: 90 }}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{ px: 2 }}
                primary={movie.title}
                secondary={movie.overview?.slice(0, 100) + "..."}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Grid>
  );
};

export default MovieGrid;
