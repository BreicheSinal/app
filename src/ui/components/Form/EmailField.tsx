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
        variant="outlined"
        error={error}
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

export default EmailField;
