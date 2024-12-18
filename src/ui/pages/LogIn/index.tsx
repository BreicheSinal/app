import { FC, useState, MouseEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  InputLabel,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./style.css";

const SignUp: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        className="flex justify-center align-center"
        item
        xs={12}
        sm={6}
        md={6}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box
            className="flex justify-center align-center"
            sx={{
              mb: 1,
            }}
          >
            <img
              src="./src/assets/icons/AthLink_noBG.png"
              alt="Logo"
              width={100}
            />
          </Box>

          <Typography
            className="bold text-center"
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              color: "#ffffff",
            }}
          >
            LOG IN
          </Typography>

          <InputLabel sx={{ color: "#2684ff" }}>Email</InputLabel>
          <TextField
            className="input-fields"
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
            className="input-fields"
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
                    disableRipple
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

          <Box
            className="flex justify-center"
            sx={{
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
              Log In
            </Button>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="text"
              disableRipple
              sx={{
                color: "#ffffff",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Don't have an account? Sign up
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
