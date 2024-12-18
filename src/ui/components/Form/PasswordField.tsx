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
  helperText?: string;
}

const PasswordField: FC<PasswordFieldProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <InputLabel sx={{ color: "#2684ff" }}>Password</InputLabel>
      <TextField
        className="input-fields"
        fullWidth
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
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

export default PasswordField;
