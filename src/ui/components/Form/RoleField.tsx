import { TextField, InputLabel, MenuItem, Box } from "@mui/material";
import { FC, ChangeEvent, ReactNode } from "react";
import { BadgeCheck } from "lucide-react";

interface RoleFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const roleConfig = {
  "1": { label: "Athlete", color: "#FF4444" },
  "2": { label: "Coach", color: "#3385FF" },
  "3": { label: "Club", color: "#9966FF" },
  "4": { label: "Federation", color: "#33CC77" },
};

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
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected: unknown): ReactNode => {
            if (!selected) {
              return <span style={{ color: "gray" }}>Role</span>;
            }
            const role = roleConfig[selected as keyof typeof roleConfig];
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <BadgeCheck size={18} color={role.color} />
                <span style={{ color: "white" }}>{role.label}</span>
              </Box>
            );
          },
        }}
        sx={{
          input: { color: "white" },
          backgroundColor: "#1D2125",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            "& .MuiSelect-icon": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
          },
        }}
      >
        {Object.entries(roleConfig).map(([value, { label, color }]) => (
          <MenuItem
            key={value}
            value={value}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px",
            }}
          >
            <BadgeCheck size={18} color={color} />
            {label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default RoleField;
