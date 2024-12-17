import { TextField, InputLabel } from "@mui/material";
import { FC, ChangeEvent } from "react";

interface EmailFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailField: FC<EmailFieldProps> = ({ value, onChange }) => {
  return (
    <>
      <InputLabel sx={{ color: "#2684ff" }}>Email</InputLabel>
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

export default EmailField;
