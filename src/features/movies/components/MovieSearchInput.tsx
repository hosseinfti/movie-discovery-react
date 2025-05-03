import { TextField } from "@mui/material";

interface Props {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MovieSearchInput = ({ query, onChange }: Props) => {
  return (
    <TextField
      label="Search by title"
      variant="outlined"
      fullWidth
      sx={{ mb: 4 }}
      defaultValue={query}
      onChange={onChange}
    />
  );
};

export default MovieSearchInput;
