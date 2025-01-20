import { TextField, InputLabel } from "@mui/material";
import { FC, ChangeEvent } from "react";

import "./style.css";

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const EmailField: FC<EmailFieldProps> = ({ value, onChange, error }) => {
  return (
    <>
      <InputLabel sx={{ color: "#9ac6ff" }}>Email</InputLabel>
      <TextField
        className="input-fields"
        fullWidth
        value={value}
        onChange={onChange}
        placeholder="Email"
        autoComplete="email"
        error={error}
        sx={{
          input: { color: "white" },
          backgroundColor: "#1D2125",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 30px #1D2125 inset !important",
              WebkitTextFillColor: "#FFFFFF !important",
            },
            "& input:-webkit-autofill:hover": {
              WebkitBoxShadow: "0 0 0 30px #1D2125 inset !important",
            },
            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: "0 0 0 30px #1D2125 inset !important",
            },
          },
        }}
      />
    </>
  );
};

export default EmailField;
