import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="300"
        image={
          movie.poster_path
            ? `${IMAGE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.length > 150
            ? movie.overview.slice(0, 150) + "..."
            : movie.overview}
        </Typography>
        بص
      </CardContent>
    </Card>
  );
};

export default MovieCard;
