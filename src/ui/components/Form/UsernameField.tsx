import { TextField, InputLabel } from "@mui/material";
import { FC, ChangeEvent } from "react";

import "./style.css";

interface UsernameFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const UsernameField: FC<UsernameFieldProps> = ({ value, onChange, error }) => {
  return (
    <>
      <InputLabel sx={{ color: "#9ac6ff" }}>Full Name</InputLabel>
      <TextField
        className="input-fields"
        fullWidth
        value={value}
        onChange={onChange}
        placeholder="Full Name"
        error={error}
        sx={{
          input: { color: "white" },
          backgroundColor: "#1D2125",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 30px #393939 inset !important",
              WebkitTextFillColor: "#1D2125 !important",
            },
            "& input:-webkit-autofill:hover": {
              WebkitBoxShadow: "0 0 0 30px #393939 inset !important",
            },
            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: "0 0 0 30px #393939 inset !important",
            },
          },
        }}
      />
    </>
  );
};

export default UsernameField;
