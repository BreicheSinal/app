import { TextField, InputLabel } from "@mui/material";
import { FC, ChangeEvent } from "react";

interface UsernameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UsernameField: FC<UsernameFieldProps> = ({ value, onChange }) => {
  return (
    <>
      <InputLabel sx={{ color: "#2684ff" }}>Username</InputLabel>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        variant="outlined"
        sx={{
          input: { color: "#ffffff" },
          backgroundColor: "#393939",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
        }}
      />
    </>
  );
};

export default UsernameField;
