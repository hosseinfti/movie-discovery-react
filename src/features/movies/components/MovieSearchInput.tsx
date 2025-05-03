import { TextField } from "@mui/material";

interface Props {
  query: string;
  setSearchParams: (params: any) => void;
}

const MovieSearchInput = ({ query, setSearchParams }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ query: e.target.value });
  };

  return (
    <TextField
      label="Search by title"
      variant="outlined"
      fullWidth
      sx={{ mb: 4 }}
      defaultValue={query}
      onChange={handleSearch}
    />
  );
};

export default MovieSearchInput;
