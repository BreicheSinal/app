import {
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FC, useState, ChangeEvent } from "react";

import "./style.css";

interface PasswordFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const PasswordField: FC<PasswordFieldProps> = ({ value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <InputLabel sx={{ color: "#9ac6ff" }}>Password</InputLabel>
      <TextField
        className="input-fields"
        fullWidth
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={value}
        onChange={onChange}
        placeholder="Password"
        error={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                sx={{ color: "white" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          input: { color: "white" },
          backgroundColor: "#1D2125",
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

export default PasswordField;
