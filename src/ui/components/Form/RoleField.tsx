import { TextField, InputLabel, MenuItem } from "@mui/material";
import { FC, ChangeEvent } from "react";

interface RoleFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RoleField: FC<RoleFieldProps> = ({ value, onChange }) => {
  return (
    <>
      <InputLabel sx={{ color: "#2684ff" }}>Role</InputLabel>
      <TextField
        select
        fullWidth
        value={value}
        onChange={onChange}
        sx={{
          input: { color: "#ffffff" },
          backgroundColor: "#393939",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            "& .MuiSelect-icon": { color: "#ffffff" },
            "& .MuiInputBase-input": { color: "#ffffff" },
          },
        }}
      >
        <MenuItem value="1">Athlete</MenuItem>
        <MenuItem value="2">Club</MenuItem>
        <MenuItem value="3">Federation</MenuItem>
      </TextField>
    </>
  );
};

export default RoleField;
