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
          },
        }}
      >
        <MenuItem value="athlete">Athlete</MenuItem>
        <MenuItem value="club">Club</MenuItem>
        <MenuItem value="federation">Federation</MenuItem>
      </TextField>
    </>
  );
};

export default RoleField;
