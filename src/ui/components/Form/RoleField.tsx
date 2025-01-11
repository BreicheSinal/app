import { TextField, InputLabel, MenuItem } from "@mui/material";
import { FC, ChangeEvent } from "react";

interface RoleFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const RoleField: FC<RoleFieldProps> = ({ value, onChange, error }) => {
  return (
    <>
      <InputLabel sx={{ color: "#9ac6ff" }}>Role</InputLabel>
      <TextField
        select
        fullWidth
        value={value}
        onChange={onChange}
        error={error}
        sx={{
          input: { color: "#1D2125" },
          backgroundColor: "#393939",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            "& .MuiSelect-icon": { color: "#1D2125" },
            "& .MuiInputBase-input": { color: "#1D2125" },
          },
        }}
      >
        <MenuItem value="1">Athlete</MenuItem>
        <MenuItem value="2">Coach</MenuItem>
        <MenuItem value="3">Club</MenuItem>
        <MenuItem value="4">Federation</MenuItem>
      </TextField>
    </>
  );
};

export default RoleField;
