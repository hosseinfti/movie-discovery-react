import { Pagination, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const MoviePagination = ({ page, totalPages, setPage }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, val) => setPage(val)}
      sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      size={isMobile ? "small" : "medium"}
    />
  );
};

export default MoviePagination;
