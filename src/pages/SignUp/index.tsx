import { FC, useState, MouseEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./style.css";

const SignUp: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const roleChange = (event: any) => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#1d2125" }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <img
              src="./src/assets/icons/AthLink_noBG.png"
              alt="Logo"
              width={100}
            />
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Typography>

          <InputLabel sx={{ color: "#2684ff" }}>Username</InputLabel>
          <TextField
            className="text-fields"
            fullWidth
            name="name"
            autoFocus
            variant="outlined"
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              backgroundColor: "#393939",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
            }}
          />

          <InputLabel sx={{ color: "#2684ff" }}>Email</InputLabel>
          <TextField
            className="text-fields"
            fullWidth
            name="email"
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              backgroundColor: "#393939",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
              },
            }}
          />

          <InputLabel sx={{ color: "#2684ff" }}>Password</InputLabel>
          <TextField
            className="text-fields"
            sx={{
              input: { color: "#ffffff" },
              backgroundColor: "#393939",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <InputLabel sx={{ color: "#2684ff" }}>Role</InputLabel>
          <TextField
            select
            fullWidth
            value={role}
            onChange={roleChange}
            sx={{
              input: { color: "#ffffff" },
              label: { color: "#ffffff" },
              backgroundColor: "#393939",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff",
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff",
                },
                "& .MuiSelect-icon": {
                  color: "#ffffff",
                },
                "& .MuiInputBase-input": {
                  color: "#ffffff",
                },
              },
            }}
          >
            <MenuItem value="athlete">Athlete</MenuItem>
            <MenuItem value="club">Club</MenuItem>
            <MenuItem value="federation">Federation</MenuItem>
          </TextField>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 4,
                backgroundColor: "#2684FF",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: "url('src/assets/images/sports.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default SignUp;
